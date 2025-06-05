import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { ApiEndpoints } from '../../../services/api-endpoints';
import { NoNegativeDirective } from '../../../directives/no-negative.directive';

interface Parking {
  nom: string;
  dateConstruction: string;
  gesConnu: boolean;
  gesReel: number | null;
}

@Component({
  selector: 'app-saisie-donnees-page',
  standalone: true,
  templateUrl: './park-saisie-donnees-page.component.html',
  styleUrls: ['./park-saisie-donnees-page.component.scss'],
  imports: [NoNegativeDirective, FormsModule, HttpClientModule, CommonModule]
})
export class ParkSaisieDonneesPageComponent implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  // État principal du formulaire
  items: {
    parkings: Parking[];
  } = {
    parkings: []
  };  

  // Nouveau parking en cours de saisie
  nouveauParking: Parking = {
    nom: '',
    dateConstruction: '',
    gesConnu: false,
    gesReel: null
  };

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

    this.http.get<any>(ApiEndpoints.ParkOnglet.getById(id), { headers }).subscribe(
      (data) => {
        if (data.parkings) {
          this.items.parkings = data.parkings;
        }
      },
      (error) => {
        console.error("Erreur lors du chargement des données", error);
      }
    );
  }

  ajouterParking(): void {
    this.items.parkings.push({ ...this.nouveauParking });

    // Réinitialisation
    this.nouveauParking = {
      nom: '',
      dateConstruction: '',
      gesConnu: false,
      gesReel: null
    };
  }

  supprimerParking(index: number): void {
    this.items.parkings.splice(index, 1);
  }
}
