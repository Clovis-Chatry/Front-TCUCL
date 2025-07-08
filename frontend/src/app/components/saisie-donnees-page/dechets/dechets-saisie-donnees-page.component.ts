import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ApiEndpoints } from '../../../services/api-endpoints';

@Component({
  selector: 'app-saisie-donnees-page',
  standalone: true,
  templateUrl: './dechets-saisie-donnees-page.component.html',
  styleUrls: ['./dechets-saisie-donnees-page.component.scss'],
  imports: [FormsModule, HttpClientModule]
})
export class DechetsSaisieDonneesPageComponent implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  items: any = {}; // Contient les données du formulaire

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
    const token = this.authService.getToken();

    if (!token) {
      console.error("Token d'authentification manquant");
      return;
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    this.http.get<any>(ApiEndpoints.DechetsOnglet.getById(id), { headers }).subscribe(
      (data) => {
        this.items = {
          orduresMenageres: data.orduresMenageres,
          traitementOrduresMenageres: data.parametreDechets?.traitementOrduresMenageres || 'Stockage',
          cartons: data.cartons,
          traitementCartons: data.parametreDechets?.traitementCartons || 'Recyclage',
          verre: data.verre,
          traitementVerre: data.parametreDechets?.traitementVerre || 'Recyclage',
          metaux: data.metaux,
          traitementMetaux: data.parametreDechets?.traitementMetaux || 'Recyclage',
          textile: data.textile,
          traitementTextile: data.parametreDechets?.traitementTextile || 'Recyclage'
        };
      },
      (error) => {
        console.error("Erreur lors du chargement des données", error);
      }
    );
  }

  updateOrdureMenagere() {
    console.log("update ordures ménagères", this.items.orduresMenageres);
    const id = this.route.snapshot.paramMap.get('id');
    const token = this.authService.getToken();

    if (id && token) {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };

      this.http.patch<any>(
        ApiEndpoints.DechetsOnglet.updateOrdureMenagere(id),
        this.items.orduresMenageres,
        { headers }
      ).subscribe(
        () => console.log('Ordures ménagères mises à jour'),
        (error) => console.error('Erreur lors de la mise à jour des ordures ménagères', error)
      );
    } else {
      console.error('ID ou Token manquant');
    }
  }
}
