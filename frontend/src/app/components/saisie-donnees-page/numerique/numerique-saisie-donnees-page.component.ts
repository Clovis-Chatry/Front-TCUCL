import { Component, OnInit, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ApiEndpoints } from '../../../services/api-endpoints';
import { CommonModule } from '@angular/common';

interface EquipementNumerique {
  id?: number;
  equipement: string;
  nombre: number | null;
  dureeAmortissement: number | null;
  emissionsGesPrecisesConnues: boolean;
  emissionsReellesParProduitKgCO2e: number | null;
  anneeAjout?: number;
}

@Component({
  selector: 'app-numerique-saisie-donnees-page',
  standalone: true,
  templateUrl: './numerique-saisie-donnees-page.component.html',
  styleUrls: ['./numerique-saisie-donnees-page.component.scss'],
  imports: [FormsModule, HttpClientModule,CommonModule]
})
export class NumeriqueSaisieDonneesPageComponent implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  useMethodSimplifiee: boolean | null = null;
  traficCloudUtilisateur: number | null = null;
  traficTipUtilisateur: number | null = null;
  partTraficFranceEtranger: number | null = null;

  nouvelEquipement: EquipementNumerique = {
    equipement: 'Ecran',
    nombre: null,
    dureeAmortissement: null,
    emissionsGesPrecisesConnues: false,
    emissionsReellesParProduitKgCO2e: null
  };

  equipementsAjoutes: EquipementNumerique[] = [];
  equipementsAnciens: EquipementNumerique[] = [];

  ngOnInit(): void {
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

    this.http.get<any>(ApiEndpoints.NumeriqueOnglet.getById(id), { headers }).subscribe(
      (data) => {
        this.useMethodSimplifiee = data.useMethodSimplifiee ?? null;
        this.traficCloudUtilisateur = data.traficCloudUtilisateur ?? null;
        this.traficTipUtilisateur = data.traficTipUtilisateur ?? null;
        this.partTraficFranceEtranger = data.partTraficFranceEtranger ?? null;
        this.equipementsAnciens = data.equipementNumeriqueList || [];
      },
      (error) => {
        console.error("Erreur lors du chargement des données numériques", error);
      }
    );
  }

  ajouterEquipement(): void {
    if (
      this.nouvelEquipement.nombre !== null &&
      this.nouvelEquipement.dureeAmortissement !== null &&
      (!this.nouvelEquipement.emissionsGesPrecisesConnues ||
        this.nouvelEquipement.emissionsReellesParProduitKgCO2e !== null)
    ) {
      this.equipementsAjoutes.push({ ...this.nouvelEquipement });
      this.nouvelEquipement = {
        equipement: 'Ecran',
        nombre: null,
        dureeAmortissement: null,
        emissionsGesPrecisesConnues: true,
        emissionsReellesParProduitKgCO2e: null
      };
    }
  }
}
