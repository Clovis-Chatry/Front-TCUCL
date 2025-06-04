import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-dom-trav-saisie-donnees-page',
  standalone: true,
  templateUrl: './dom-trav-saisie-donnees-page.component.html',
  styleUrls: ['./dom-trav-saisie-donnees-page.component.scss'],
  imports: [FormsModule, HttpClientModule, JsonPipe]
})
export class DomTravSaisieDonneesPageComponent implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  items: any = {};

  ngOnInit() {
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

    this.http.get<any>(`/api/mobilite-domtrav/${id}`, { headers }).subscribe(
      (data) => {
        this.items = {
          aPiedsEtudiant: data.aPiedsEtudiant,
          aPiedsSalarie: data.aPiedsSalarie,
          busEtudiant: data.busEtudiant,
          busSalarie: data.busSalarie,
          metroTramEtudiant: data.metroTramEtudiant,
          metroTramSalarie: data.metroTramSalarie,
          motoEtudiant: data.motoEtudiant,
          motoSalarie: data.motoSalarie,
          voitureThermiqueEtudiant: data.voitureThermiqueEtudiant,
          voitureThermiqueSalarie: data.voitureThermiqueSalarie,
          voitureElecEtudiant: data.voitureElecEtudiant,
          voitureElecSalarie: data.voitureElecSalarie
        };
      },
      (error) => {
        console.error("Erreur lors du chargement des données", error);
      }
    );
  }

  updateConso() {
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

    this.http.patch<any>(
      `/api/mobilite-domtrav/${id}/update`,
      this.items,
      { headers }
    ).subscribe(
      () => console.log('Données de mobilité mises à jour'),
      (error) => console.error('Erreur lors de la mise à jour', error)
    );
  }
}
