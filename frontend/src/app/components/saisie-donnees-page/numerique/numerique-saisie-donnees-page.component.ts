import { Component, OnInit, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ApiEndpoints } from '../../../services/api-endpoints';
import { CommonModule } from '@angular/common';
import { SaveFooterComponent } from '../../save-footer/save-footer.component';
import { OngletStatusService } from '../../../services/onglet-status.service';
import { NumeriqueOngletMapperService } from './numerique-onglet-mapper.service';
import { EquipementNumerique, NumeriqueOnglet } from '../../../models/numerique.model';
import { NUMERIQUE_EQUIPEMENT } from '../../../models/enums/numerique.enum';
import { NumeriqueEquipmentLabels } from '../../../models/numerique-equipment-labels';

@Component({
  selector: 'app-numerique-saisie-donnees-page',
  standalone: true,
  templateUrl: './numerique-saisie-donnees-page.component.html',
  styleUrls: ['./numerique-saisie-donnees-page.component.scss'],
  imports: [FormsModule, HttpClientModule, CommonModule, SaveFooterComponent]
})
export class NumeriqueSaisieDonneesPageComponent implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private statusService = inject(OngletStatusService);
  private mapper = inject(NumeriqueOngletMapperService);

  donneesCloudDisponibles: boolean | null = null;
  traficCloud: number | null = null;
  tipUtilisateur: number | null = null;

  nouvelEquipement: EquipementNumerique = {
    equipement: NUMERIQUE_EQUIPEMENT.ECRAN,
    nombre: null,
    dureeAmortissement: null,
    emissionsGesPrecisesConnues: false,
    emissionsReellesParProduitKgCO2e: null
  };

  equipementOptions = Object.keys(NUMERIQUE_EQUIPEMENT).map(key => {
    const value = NUMERIQUE_EQUIPEMENT[key as keyof typeof NUMERIQUE_EQUIPEMENT];
    return { value, label: NumeriqueEquipmentLabels[value] };
  });

  numeriqueEquipmentLabels = NumeriqueEquipmentLabels;

  equipementsAjoutes: EquipementNumerique[] = [];
  equipementsAnciens: EquipementNumerique[] = [];
  estTermine = false;

  onEstTermineChange(value: boolean): void {
    this.estTermine = value;
    this.updateData();
  }

  ngOnInit(): void {
    this.estTermine = this.statusService.getStatus('numeriqueOnglet');
    this.statusService.statuses$.subscribe(statuses => {
      this.estTermine = statuses['numeriqueOnglet'] ?? false;
    });
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadData(id);
    }
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

    this.http.get<any>(ApiEndpoints.NumeriqueOnglet.getById(id), { headers }).subscribe({
      next: data => {
        const model = this.mapper.fromDto(data);
        this.donneesCloudDisponibles = model.cloudDataDisponible;
        this.traficCloud = model.traficCloud;
        this.tipUtilisateur = model.tipUtilisateur;
        this.equipementsAnciens = model.equipements;
      },
      error: err => console.error("Erreur lors du chargement des données numériques", err)
    });
  }

  ajouterEquipement(): void {
    if (
      this.nouvelEquipement.nombre !== null &&
      this.nouvelEquipement.dureeAmortissement !== null &&
      (!this.nouvelEquipement.emissionsGesPrecisesConnues || this.nouvelEquipement.emissionsReellesParProduitKgCO2e !== null)
    ) {
      this.equipementsAjoutes.push({ ...this.nouvelEquipement });
      this.nouvelEquipement = {
        equipement: NUMERIQUE_EQUIPEMENT.ECRAN,
        nombre: null,
        dureeAmortissement: null,
        emissionsGesPrecisesConnues: true,
        emissionsReellesParProduitKgCO2e: null
      };
      this.updateData();
    }
  }

  updateData(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const token = this.authService.getToken();
    if (!id || !token) {
      console.error('ID ou token manquant');
      return;
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    const model: NumeriqueOnglet = {
      estTermine: this.estTermine,
      cloudDataDisponible: this.donneesCloudDisponibles,
      traficCloud: this.traficCloud,
      tipUtilisateur: this.tipUtilisateur,
      equipements: this.equipementsAjoutes
    };

    const payload = this.mapper.toDto(model);

    this.http.patch(ApiEndpoints.NumeriqueOnglet.update(id), payload, { headers }).subscribe({
      error: err => console.error('Erreur lors de la mise \xC3\xA0 jour des donn\xC3\xA9es num\xC3\xA9riques', err)
    });
  }
}
