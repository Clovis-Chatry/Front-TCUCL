import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { ApiEndpoints } from '../../../services/api-endpoints';
import { Pays } from '../../../models/enums/pays.enum';

@Component({
  selector: 'app-destination-page',
  standalone: true,
  templateUrl: './mob-inter-saisie-donnees-page.component.html',
  styleUrls: ['./mob-inter-saisie-donnees-page.component.scss'],
  imports: [FormsModule, HttpClientModule, CommonModule]
})
export class MobiliteInternationaleSaisieDonneesPageComponent implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  destinationEnCours = {
    pays: '',
    avion: { pro: null, stage: null, semestre: null },
    train: { pro: null, stage: null, semestre: null }
  };

  destinations: any[] = [];

  listePays = Object.values(Pays);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) this.loadData(id);
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

    this.http.get<any>(ApiEndpoints.MobiliteInternationaleOnglet.getById(id), { headers }).subscribe(
      (data) => {
        if (data.destinations) {
          this.destinations = data.destinations;
        }
      },
      (error) => {
        console.error("Erreur lors du chargement des données", error);
      }
    );
  }

  ajouterDestination(): void {
    const nouvelle = {
      pays: this.destinationEnCours.pays,
      avion: { ...this.destinationEnCours.avion },
      train: { ...this.destinationEnCours.train }
    };

    this.destinations.push(nouvelle);

    this.destinationEnCours = {
      pays: '',
      avion: { pro: null, stage: null, semestre: null },
      train: { pro: null, stage: null, semestre: null }
    };
  }

  supprimerDestination(index: number): void {
    this.destinations.splice(index, 1);
  }
}
