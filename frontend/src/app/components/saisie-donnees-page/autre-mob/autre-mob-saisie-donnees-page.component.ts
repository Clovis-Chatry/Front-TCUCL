import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GROUPE_VOYAGEURS } from '../../../models/enums/transport.enum';
import { MODE_TRANSPORT_AUTRE_MOB } from '../../../models/enums/transport.enum';
import { TransportAutreMob } from '../../../models/transport-data.model';

import { ApiEndpoints } from '../../../services/api-endpoints';
import { AuthService } from '../../../services/auth.service';
import { TransportAutreMobMapperService} from './transport-data-autre-mob-mapper.service';
import { SaveFooterComponent } from '../../save-footer/save-footer.component';
import { OngletStatusService } from '../../../services/onglet-status.service';
import { ONGLET_KEYS } from '../../../constants/onglet-keys';

@Component({
  selector: 'app-autre-mob-saisie-donnees-page',
  standalone: true,
  templateUrl: './autre-mob-saisie-donnees-page.component.html',
  styleUrls: ['./autre-mob-saisie-donnees-page.component.scss'],
  imports: [CommonModule, FormsModule, SaveFooterComponent],
})
export class AutreMobSaisieDonneesPageComponent implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private auth = inject(AuthService);
  private mapper = inject(TransportAutreMobMapperService);
  private statusService = inject(OngletStatusService);

  items: TransportAutreMob[] = [];

  estTermine = false;
  ONGLET_KEYS = ONGLET_KEYS;
  resultat: any = null;

  transportModes = Object.values(MODE_TRANSPORT_AUTRE_MOB);
  travelerGroups = Object.values(GROUPE_VOYAGEURS);

  ngOnInit(): void {
    this.estTermine = this.statusService.getStatus(ONGLET_KEYS.AutreMobFr);
    this.statusService.statuses$.subscribe((s: Record<string, boolean>) => {
      this.estTermine = s[ONGLET_KEYS.AutreMobFr] ?? false;
    });
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadData(id);
      this.loadResultat(id);
    }
  }

  loadData(id: string): void {
    const token = this.auth.getToken();
    if (!token) return;

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    this.http.get<any>(ApiEndpoints.AutreMobFrOnglet.getById(id), { headers }).subscribe({
      next: data => {
        this.items = this.mapper.parseFlatData(data);
        this.estTermine = data.estTermine ?? false;
        this.statusService.setStatus(ONGLET_KEYS.AutreMobFr, this.estTermine);
      },
      error: err => console.error('Erreur chargement autre mob:', err),
    });
  }

  loadResultat(id: string) {
    const token = this.auth.getToken();
    if (!token) return;

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    // Charger les résultats calculés
    this.http.get<any>(ApiEndpoints.AutreMobFrOnglet.resultats(id), { headers }).subscribe({
      next: res => {
        this.resultat = res;
      },
      error: err => console.error('Erreur chargement résultats autre mob:', err),
    });

  }

  getValue(mode: MODE_TRANSPORT_AUTRE_MOB, group: GROUPE_VOYAGEURS, field: 'distanceKm' | 'oneWayTrips'): number {
    return this.items.find(e => e.transportMode === mode && e.travelerGroup === group)?.[field] ?? 0;
  }

  setValue(mode: MODE_TRANSPORT_AUTRE_MOB, group: GROUPE_VOYAGEURS, field: 'distanceKm' | 'oneWayTrips', value: number) {
    let item = this.items.find(e => e.transportMode === mode && e.travelerGroup === group);
    if (!item) {
      item = {
        transportMode: mode,
        travelerGroup: group,
        distanceKm: 0,
        oneWayTrips: 0,
      };
      this.items.push(item);
    }

    item[field] = value;
    this.updateData();
  }

  private tempValues = new Map<string, number>();

  onEstTermineChange(value: boolean): void {
    this.estTermine = value;
    this.updateData();
  }

  setValueTemp(mode: MODE_TRANSPORT_AUTRE_MOB, group: GROUPE_VOYAGEURS, field: 'distanceKm' | 'oneWayTrips', value: number) {
    const key = `${mode}_${group}_${field}`;
    this.tempValues.set(key, value);
  }

  applyValue(mode: MODE_TRANSPORT_AUTRE_MOB, group: GROUPE_VOYAGEURS, field: 'distanceKm' | 'oneWayTrips') {
    const key = `${mode}_${group}_${field}`;
    const value = this.tempValues.get(key);
    if (value !== undefined) {
      this.setValue(mode, group, field, value);
    }
  }

  updateData(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const token = this.auth.getToken();
    if (!id || !token) return;

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const payload = { ...this.mapper.buildFlatPayload(this.items), estTermine: this.estTermine };

    this.http.patch(ApiEndpoints.AutreMobFrOnglet.update(id), payload, { headers }).subscribe({next: () => {
        this.loadResultat(id);
      },
      error: err => console.error('PATCH autre mobilité échoué', err),
    });
  }
}
