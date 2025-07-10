import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SaveFooterComponent } from '../../save-footer/save-footer.component';
import { AuthService } from '../../../services/auth.service';
import { ApiEndpoints } from '../../../services/api-endpoints';
import { VehiculeOngletMapperService } from './vehicule-onglet-mapper.service';
import { ONGLET_KEYS } from '../../../constants/onglet-keys';
import { VEHICULE_TYPE } from '../../../models/enums/vehicule.enum';
import { Vehicule, VehiculeOngletModel } from '../../../models/vehicule.model';
import { OngletStatusService } from '../../../services/onglet-status.service';

@Component({
  selector: 'app-auto-saisie-donnees-page',
  standalone: true,
  templateUrl: './auto-saisie-donnees-page.component.html',
  styleUrls: ['./auto-saisie-donnees-page.component.scss'],
  imports: [FormsModule, HttpClientModule, CommonModule, SaveFooterComponent]
})
export class AutoSaisieDonneesPageComponent implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private mapper = inject(VehiculeOngletMapperService);
  private statusService = inject(OngletStatusService);
  vehiculeResultat: {
    totalEmissionGESFabrication: number,
    totalEmissionGESPetrole: number,
    totalEmissionGESElectrique: number,
    totalEmissionGES: number
  } | null = null;

  vehiculeOnglet: VehiculeOngletModel = { vehicules: [] };
  nouveauVehicule: Vehicule = {
    modeleOuImmatriculation: '',
    typeVehicule: VEHICULE_TYPE.THERMIQUE,
    nombreVehiculesIdentiques: null,
    nombreKilometresParVoitureMoyen: null
  };

  vehiculeTypes = Object.values(VEHICULE_TYPE);
  vehiculeTypesLibelles = [
    { value: VEHICULE_TYPE.THERMIQUE, label: 'Thermique' },
    { value: VEHICULE_TYPE.HYBRIDE, label: 'Hybride' },
    { value: VEHICULE_TYPE.ELECTRIQUE, label: 'Électrique' }
  ];

  ONGLET_KEYS = ONGLET_KEYS;

  getLibelleTypeVehicule(type: string): string {
    const item = this.vehiculeTypesLibelles.find(t => t.value === type);
    return item ? item.label : type;
  }

  ngOnInit(): void {
    this.vehiculeOnglet.estTermine = this.statusService.getStatus(ONGLET_KEYS.Auto);
    this.statusService.statuses$.subscribe((s: Record<string, boolean>) => {
      this.vehiculeOnglet.estTermine = s[ONGLET_KEYS.Auto] ?? false;
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadData(id);
      this.loadResultat(id);
    }
  }

  private getAuthHeaders() {
    const token = this.authService.getToken();
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    };
  }

  loadData(id: string): void {
    const headers = this.getAuthHeaders();
    this.http.get<any>(ApiEndpoints.AutoOnglet.getById(id), { headers }).subscribe({
      next: data => {
        const model = this.mapper.fromDto(data);
        this.vehiculeOnglet.vehicules = model.vehicules;
        this.vehiculeOnglet.note = model.note;
        this.vehiculeOnglet.estTermine = model.estTermine ?? false;
        this.statusService.setStatus(ONGLET_KEYS.Auto, this.vehiculeOnglet.estTermine);
      },
      error: err => console.error('Erreur lors du chargement des véhicules', err)
    });
  }

  onEstTermineChange(value: boolean): void {
    this.vehiculeOnglet.estTermine = value;
    this.updateData();
  }

  ajouterVehicule(): void {
    this.vehiculeOnglet.vehicules.push({ ...this.nouveauVehicule });
    this.nouveauVehicule = {
      modeleOuImmatriculation: '',
      typeVehicule: VEHICULE_TYPE.THERMIQUE,
      nombreVehiculesIdentiques: null,
      nombreKilometresParVoitureMoyen: null
    };
    this.updateData();
  }

  supprimerVehicule(index: number): void {
    this.vehiculeOnglet.vehicules.splice(index, 1);
    this.updateData();
  }

  updateData(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    const headers = this.getAuthHeaders();
    const payload = this.mapper.toDto(this.vehiculeOnglet);
    this.http.patch(ApiEndpoints.AutoOnglet.update(id), payload, { headers }).subscribe({
      next: () => {
        this.loadResultat(id);
      },
      error: err => console.error('Erreur mise à jour véhicules', err)
    });
  }

  loadResultat(id: string): void {
    const headers = this.getAuthHeaders();
    this.http.get<any>(ApiEndpoints.AutoOnglet.resultats(id), { headers }).subscribe({
      next: res => {
        this.vehiculeResultat = res;
      },
      error: err => console.error('Erreur lors du chargement des résultats', err)
    });
  }
}
