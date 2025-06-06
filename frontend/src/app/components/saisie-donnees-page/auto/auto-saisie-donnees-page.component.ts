import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SaveFooterComponent } from '../../save-footer/save-footer.component';
import { AuthService } from '../../../services/auth.service';
import { ApiEndpoints } from '../../../services/api-endpoints';
import { VehiculeOngletMapperService } from './vehicule-onglet-mapper.service';
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

  getLibelleTypeVehicule(type: string): string {
    const item = this.vehiculeTypesLibelles.find(t => t.value === type);
    return item ? item.label : type;
  }

  ngOnInit(): void {
    this.vehiculeOnglet.estTermine = this.statusService.getStatus('autoOnglet');
    this.statusService.statuses$.subscribe(s => {
      this.vehiculeOnglet.estTermine = s['autoOnglet'] ?? false;
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadData(id);
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
      error: err => console.error('Erreur mise à jour véhicules', err)
    });
  }
}
