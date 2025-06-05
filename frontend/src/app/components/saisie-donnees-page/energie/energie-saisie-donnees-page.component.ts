import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router'; // Permet de récupérer l'ID de l'URL
import {AuthService} from '../../../services/auth.service';
import {ApiEndpoints} from '../../../services/api-endpoints';
import { NoNegativeDirective } from '../../../directives/no-negative.directive';

@Component({
  selector: 'app-saisie-donnees-page',
  standalone: true,
  templateUrl: './energie-saisie-donnees-page.component.html',
  styleUrls: ['./energie-saisie-donnees-page.component.scss'],
  imports: [NoNegativeDirective, FormsModule, HttpClientModule]
})
export class EnergieSaisieDonneesPageComponent implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute); // Récupération des paramètres de l'URL
  private authService = inject(AuthService);

  items: any = {}; // Objet qui contiendra les données récupérées

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
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

    this.http.get<any>(ApiEndpoints.EnergieOnglet.getById(id), {headers}).subscribe(
      (data) => {
        this.items = {
          consoGaz: data.consoGaz,
          uniteGaz: data.uniteGaz,
          consoFioul: data.consoFioul,
          uniteFioul: data.uniteFioul,
          consoBois: data.consoBois,
          uniteBois: data.uniteBois,
          consoReseauVille: data.consoReseauVille,
          consoElecChauffage: data.consoElecChauffage,
          consoElecSpecifique: data.consoElecSpecifique,
          consoEau: data.consoEau
        };
      },
      (error) => {
        console.error("Erreur lors du chargement des données", error);
      }
    );
  }

  updateConso() {
    const id = this.route.snapshot.paramMap.get('id');
    const token = this.authService.getToken(); // Récupère le token

    if (id && token) {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Ajoute le token d'authentification
      };

      this.http.patch<any>(
        ApiEndpoints.EnergieOnglet.updateConso(id),
        {
          consoGaz: this.items.consoGaz,
          uniteGaz: this.items.uniteGaz,
          consoFioul: this.items.consoFioul,
          uniteFioul: this.items.uniteFioul,
          consoBois: this.items.consoBois,
          uniteBois: this.items.uniteBois,
          consoReseauVille: this.items.consoReseauVille,
          consoElecChauffage: this.items.consoElecChauffage,
          consoElecSpecifique: this.items.consoElecSpecifique,
          consoEau: this.items.consoEau
        },
        {headers}
      ).subscribe(
        (error) => console.error('Erreur lors de la mise à jour de ConsoGaz', error)
      );
    } else {
      console.error('ID ou Token manquant');
    }
  }
}
