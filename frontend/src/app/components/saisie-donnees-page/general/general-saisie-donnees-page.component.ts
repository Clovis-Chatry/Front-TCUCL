import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router'; // Permet de récupérer l'ID de l'URL
import { AuthService } from '../../../services/auth.service';
import { ApiEndpoints } from '../../../services/api-endpoints';
import { OngletStatusService } from '../../../services/onglet-status.service';
import { ONGLET_KEYS } from '../../../constants/onglet-keys';
import { SaveFooterComponent } from '../../save-footer/save-footer.component';

@Component({
  selector: 'app-saisie-donnees-page',
  standalone: true,
  templateUrl: './general-saisie-donnees-page.component.html',
  styleUrls: ['./general-saisie-donnees-page.component.scss'],
  imports: [FormsModule, HttpClientModule, SaveFooterComponent]
})
export class GeneralSaisieDonneesPageComponent implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private statusService = inject(OngletStatusService);

  items: any = {
    nombreSalaries: null,
    nombreEtudiants: null
  };
  estTermine = false;
  ONGLET_KEYS = ONGLET_KEYS;

  onEstTermineChange(value: boolean): void {
    this.estTermine = value;
    this.updateConso();
  }

  ngOnInit() {
    this.estTermine = this.statusService.getStatus(ONGLET_KEYS.Energie);
    this.statusService.statuses$.subscribe((statuses: Record<string, boolean>) => {
      this.estTermine = statuses[ONGLET_KEYS.Energie] ?? false;
    });
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadData(id);
      }
    });
  }

  loadData(id: string) {
    const token = this.authService.getToken();

    if (!token) {
      console.error("Token d'authentification manquant");
      return;
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    this.http.get<any>(ApiEndpoints.GeneralOnglet.getById(id), { headers }).subscribe(
      (data) => {
        this.items = {
          nombreSalaries: data.nbSalarie ?? null,
          nombreEtudiants: data.nbEtudiant ?? null
        };
        this.estTermine = data.estTermine ?? false;
        this.statusService.setStatus(ONGLET_KEYS.Energie, this.estTermine);
      },
      (error) => {
        console.error("Erreur lors du chargement des données", error);
      }
    );
  }

  updateConso() {
    const id = this.route.snapshot.paramMap.get('id');
    const token = this.authService.getToken();

    if (id && token) {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };

      this.http.patch<any>(
        ApiEndpoints.GeneralOnglet.updateNombre(id),
        {
          nbSalarie: this.items.nombreSalaries,
          nbEtudiant: this.items.nombreEtudiants,
          estTermine: this.estTermine
        },
        { headers }
      ).subscribe({
        next: () => {},
        error: err => console.error('Erreur lors de la mise à jour des données', err)
      });
    } else {
      console.error('ID ou Token manquant');
    }
  }
}
