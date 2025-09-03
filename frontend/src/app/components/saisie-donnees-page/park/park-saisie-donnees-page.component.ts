import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { ApiEndpoints } from '../../../services/api-endpoints';
import { SaveFooterComponent } from '../../save-footer/save-footer.component';
import { OngletStatusService } from '../../../services/onglet-status.service';
import { ONGLET_KEYS } from '../../../constants/onglet-keys';
import { PARKING_VOIRIE_TYPE, PARKING_VOIRIE_TYPE_STRUCTURE } from '../../../models/enums/parking-voirie.enum';
import { ParkingVoirie, ParkingVoirieOngletModel } from '../../../models/parking-voirie.model';
import { ParkingVoirieOngletMapperService } from './parking-voirie-onglet-mapper.service';

@Component({
  selector: 'app-saisie-donnees-page',
  standalone: true,
  templateUrl: './park-saisie-donnees-page.component.html',
  styleUrls: ['./park-saisie-donnees-page.component.scss'],
  imports: [FormsModule, HttpClientModule, CommonModule, SaveFooterComponent]
})
export class ParkSaisieDonneesPageComponent implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private statusService = inject(OngletStatusService);
  private mapper = inject(ParkingVoirieOngletMapperService);

  parkingOnglet: ParkingVoirieOngletModel = { parkings: [] };
  totalEmissionGES: number | null = null;

  nouveauParking: ParkingVoirie = {
    nomOuAdresse: '',
    dateConstruction: null,
    emissionsGesConnues: false,
    emissionsGesReelles: null,
    type: PARKING_VOIRIE_TYPE.PARKING,
    nombreM2: null,
    typeStructure: PARKING_VOIRIE_TYPE_STRUCTURE.BITUME
  };

  parkingTypes = Object.values(PARKING_VOIRIE_TYPE);
  structureTypes = Object.values(PARKING_VOIRIE_TYPE_STRUCTURE);

  ONGLET_KEYS = ONGLET_KEYS;

  onEmissionsConnuesChange(value: boolean): void {
    if (!value) {
      this.nouveauParking.emissionsGesReelles = null;
    }
  }

  ngOnInit(): void {
    this.parkingOnglet.estTermine = this.statusService.getStatus(ONGLET_KEYS.Parkings);
    this.statusService.statuses$.subscribe((s: Record<string, boolean>) => {
      this.parkingOnglet.estTermine = s[ONGLET_KEYS.Parkings] ?? false;
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadData(id);
        this.loadTotalEmission(id);
      }
    });
  }

  loadData(id: string): void {
    const token = this.authService.getToken();

    if (!token) {
      console.error("Token d'authentification manquant");
      return;
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    this.http.get<any>(ApiEndpoints.ParkingVoirieOnglet.getById(id), { headers }).subscribe({
      next: data => {
        const model = this.mapper.fromDto(data);
        this.parkingOnglet.parkings = model.parkings;
        this.parkingOnglet.note = model.note;
        this.parkingOnglet.estTermine = model.estTermine ?? false;
        this.statusService.setStatus(ONGLET_KEYS.Parkings, this.parkingOnglet.estTermine);
      },
      error: err => console.error("Erreur lors du chargement des données", err)
    });
  }

  ajouterParking(): void {
    if (!this.nouveauParking.emissionsGesConnues) {
      this.nouveauParking.emissionsGesReelles = null;
    }
    this.parkingOnglet.parkings.push({ ...this.nouveauParking });
    this.nouveauParking = {
      nomOuAdresse: '',
      dateConstruction: null,
      emissionsGesConnues: false,
      emissionsGesReelles: null,
      type: PARKING_VOIRIE_TYPE.PARKING,
      nombreM2: null,
      typeStructure: PARKING_VOIRIE_TYPE_STRUCTURE.BITUME
    };
    this.updateData();
  }

  supprimerParking(index: number): void {
    this.parkingOnglet.parkings.splice(index, 1);
    this.updateData();
  }

  onEstTermineChange(value: boolean): void {
    this.parkingOnglet.estTermine = value;
    this.updateData();
  }

  private getAuthHeaders() {
    const token = this.authService.getToken();
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    };
  }

  updateData(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    const headers = this.getAuthHeaders();
    const payload = this.mapper.toDto(this.parkingOnglet);
    this.http.patch(ApiEndpoints.ParkingVoirieOnglet.update(id), payload, { headers }).subscribe({
      next: () => {
        this.loadTotalEmission(id);
      },
      error: err => console.error('Erreur mise à jour parkings', err)
    });
  }

  loadTotalEmission(ongletId: string): void {
    const headers = this.getAuthHeaders();
    this.http.get<{ totalEmissionGES: number }>(ApiEndpoints.ParkingVoirieOnglet.getResult(ongletId), { headers }).subscribe({
      next: (res) => {
        this.totalEmissionGES = res.totalEmissionGES;
      },
      error: (err) => {
        console.error("Erreur lors du chargement du total émissions GES", err);
        this.totalEmissionGES = null;
      }
    });
  }
}
