import {Component, inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {ApiEndpoints} from '../../../services/api-endpoints';
import {TransportData} from '../../../models/transport-data.model';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-saisie-donnees-page',
  standalone: true,
  templateUrl: './dom-trav-saisie-donnees-page.component.html',
  styleUrls: ['./dom-trav-saisie-donnees-page.component.scss'],
  imports: [
    FormsModule
  ]
})
export class DomTravSaisieDonneesPageComponent implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute); // Récupération des paramètres de l'URL
  private authService = inject(AuthService);

  items: TransportData = {} as TransportData;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log('ID récupéré:', id);
      if (id) {
        this.loadData(id);
      }
    });
  }

  loadData(id: string) {
    const token = this.authService.getToken(); // 🔥 Récupération du token

    if (!token) {
      console.error("Token d'authentification manquant");
      return;
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // 🔥 Ajout du token dans l'en-tête
    };

    this.http.get<TransportData>(ApiEndpoints.DomTravOnglet.getById(id), { headers }).subscribe(
      (data: TransportData) => {
        this.items = { ...data };
      },
      (error) => {
        console.error("Erreur lors du chargement des données", error);
      }
    );

  }
}
