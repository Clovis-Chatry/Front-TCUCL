import { Component, OnInit, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ApiEndpoints } from '../../../services/api-endpoints';
import { CommonModule } from '@angular/common';
import { SaveFooterComponent } from '../../save-footer/save-footer.component';
import { OngletStatusService } from '../../../services/onglet-status.service';

interface EquipementNumerique {
  type: string;
  quantite: number | null;
  amortissement: number | null;
  gesConnu: boolean;
  gesReel: number | null;
  anneeAjout?: number;
}

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

  donneesCloudDisponibles: boolean | null = null;
  traficCloud: number | null = null;
  tipUtilisateur: number | null = null;

  nouvelEquipement: EquipementNumerique = {
    type: 'Ecran',
    quantite: null,
    amortissement: null,
    gesConnu: false,
    gesReel: null
  };

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

    this.http.get<any>(ApiEndpoints.NumeriqueOnglet.getById(id), { headers }).subscribe(
      (data) => {
        this.donneesCloudDisponibles = data.cloudData?.disponible ?? null;
        this.traficCloud = data.cloudData?.trafic ?? null;
        this.tipUtilisateur = data.cloudData?.tip ?? null;
        this.equipementsAnciens = data.equipements || [];
      },
      (error) => {
        console.error("Erreur lors du chargement des données numériques", error);
      }
    );
  }

  ajouterEquipement(): void {
    if (
      this.nouvelEquipement.quantite !== null &&
      this.nouvelEquipement.amortissement !== null &&
      (!this.nouvelEquipement.gesConnu || this.nouvelEquipement.gesReel !== null)
    ) {
      this.equipementsAjoutes.push({ ...this.nouvelEquipement });
      this.nouvelEquipement = {
        type: 'Ecran',
        quantite: null,
        amortissement: null,
        gesConnu: true,
        gesReel: null
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

    const payload = {
      cloudData: {
        disponible: this.donneesCloudDisponibles,
        trafic: this.traficCloud,
        tip: this.tipUtilisateur
      },
      equipements: this.equipementsAjoutes,
      estTermine: this.estTermine
    };

    this.http.patch(ApiEndpoints.NumeriqueOnglet.update(id), payload, { headers }).subscribe({
      error: err => console.error('Erreur lors de la mise \xC3\xA0 jour des donn\xC3\xA9es num\xC3\xA9riques', err)
    });
  }
}
