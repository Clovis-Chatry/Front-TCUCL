import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-autre-mob-saisie-donnees-page',
  standalone: true,
  templateUrl: './autre-mob-saisie-donnees-page.component.html',
  styleUrls: ['./autre-mob-saisie-donnees-page.component.scss'],
  imports: [FormsModule, HttpClientModule]
})
export class AutreMobSaisieDonneesPageComponent implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  items: any = {};

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadData(id);
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

    this.http.get<any>(`/api/autre-mobilite/${id}`, { headers }).subscribe(
      data => {
        this.items = {
          trainEtudiantAller: data.trainEtudiantAller,
          trainEtudiantDistance: data.trainEtudiantDistance,
          trainSalarieAller: data.trainSalarieAller,
          trainSalarieDistance: data.trainSalarieDistance,
          avionEtudiantAller: data.avionEtudiantAller,
          avionEtudiantDistance: data.avionEtudiantDistance,
          avionSalarieAller: data.avionSalarieAller,
          avionSalarieDistance: data.avionSalarieDistance,
          autreEtudiantAller: data.autreEtudiantAller,
          autreEtudiantDistance: data.autreEtudiantDistance,
          autreSalarieAller: data.autreSalarieAller,
          autreSalarieDistance: data.autreSalarieDistance
        };
      },
      error => {
        console.error("Erreur lors du chargement des données", error);
      }
    );
  }

  updateConso(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const token = this.authService.getToken();

    if (!id || !token) {
      console.error("ID ou token manquant");
      return;
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    this.http.patch<any>(`/api/autre-mobilite/${id}/update`, this.items, { headers }).subscribe(
      () => console.log('Données mises à jour'),
      error => console.error('Erreur lors de la mise à jour', error)
    );
  }
}
