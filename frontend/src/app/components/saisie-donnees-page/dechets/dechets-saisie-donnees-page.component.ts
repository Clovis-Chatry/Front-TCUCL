import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TYPE_DECHET, TRAITEMENT_DECHET } from '../../../models/enums/dechet.enum';
import { DechetData} from '../../../models/dechet-data-model';
import { DechetDataMapperService } from './dechet-data-mapper.service';
import { ApiEndpoints } from '../../../services/api-endpoints';
import { AuthService } from '../../../services/auth.service';
import { SaveFooterComponent } from '../../save-footer/save-footer.component';
import { OngletStatusService } from '../../../services/onglet-status.service';

@Component({
  selector: 'app-dechet-saisie-donnees-page',
  standalone: true,
  templateUrl: './dechets-saisie-donnees-page.component.html',
  styleUrls: ['./dechets-saisie-donnees-page.component.scss'],
  imports: [CommonModule, FormsModule, SaveFooterComponent],
})
export class DechetSaisieDonneesPageComponent implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private auth = inject(AuthService);
  private mapper = inject(DechetDataMapperService);
  private statusService = inject(OngletStatusService);

  items: DechetData[] = [];

  estTermine = false;

  types = Object.values(TYPE_DECHET);
  traitements = Object.values(TRAITEMENT_DECHET);

  ngOnInit(): void {
    this.estTermine = this.statusService.getStatus('dechetsOnglet');
    this.statusService.statuses$.subscribe(s => {
      this.estTermine = s['dechetsOnglet'] ?? false;
    });
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.loadData(id);
  }

  loadData(id: string): void {
    const token = this.auth.getToken();
    if (!token) return;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    };

    this.http.get<any>(ApiEndpoints.DechetsOnglet.getById(id), { headers }).subscribe({
      next: data => this.items = this.mapper.parseData(data),
      error: err => console.error('Erreur chargement déchets:', err)
    });
  }

  updateData(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const token = this.auth.getToken();
    if (!id || !token) return;

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    };

    const payload = { ...this.mapper.buildPayload(this.items), estTermine: this.estTermine };

    this.http.patch(ApiEndpoints.DechetsOnglet.update(id), payload, { headers }).subscribe({
      error: err => console.error('PATCH déchets échoué', err)
    });
  }

  updateConso(): void {
    console.log('Mise à jour des champs de déchets :', this.items);
  }

  onEstTermineChange(value: boolean): void {
    this.estTermine = value;
    this.updateData();
  }
}
