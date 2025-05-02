import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { ApiEndpoints } from '../../../services/api-endpoints';

@Component({
  selector: 'app-batiments-page',
  standalone: true,
  templateUrl: './bat-saisie-donnees-page.component.html',
  styleUrls: ['./bat-saisie-donnees-page.component.scss'],
  imports: [FormsModule, HttpClientModule, CommonModule]
})
export class BatimentsSaisieDonneesPageComponent implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  // Parc immobilier (section 1)
  nouveauBatiment: any = {
    nom: '',
    dateConstruction: '',
    moinsDe50ans: null,
    renoComplete: null,
    dateRenoComplete: '',
    acvConnu: null,
    gesReel: null,
    type: '',
    surface: null,
    structure: ''
  };

  batimentsAjoutes: any[] = [];

  // Entretien / rénovations (section 2)
  nouvelleReno: any = {
    nomBatiment: '',
    typeTravaux: '',
    dateTravaux: '',
    typeBatiment: '',
    surface: null,
    dureeAmortissement: null
  };

  renovationsCourantes: any[] = [];
  renovationsPassees: any[] = [];

  // Mobilier (section 3)
  nouveauMobilier: any = {
    type: '',
    nombre: null,
    poids: null,
    dureeAmortissement: null
  };

  mobiliersAjoutes: any[] = [];

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

    this.http.get<any>(ApiEndpoints.BatimentsOnglet.getById(id), { headers }).subscribe(
      (data) => {
        this.batimentsAjoutes = data.batiments || [];
        this.renovationsCourantes = data.renovationsCourantes || [];
        this.renovationsPassees = data.renovationsPassees || [];
        this.mobiliersAjoutes = data.mobiliers || [];
      },
      (error) => {
        console.error("Erreur lors du chargement des données", error);
      }
    );
  }

  ajouterBatiment(): void {
    this.batimentsAjoutes.push({ ...this.nouveauBatiment });
    this.nouveauBatiment = {
      nom: '',
      dateConstruction: '',
      moinsDe50ans: null,
      renoComplete: null,
      dateRenoComplete: '',
      acvConnu: null,
      gesReel: null,
      type: '',
      surface: null,
      structure: ''
    };
  }

  ajouterRenovation(): void {
    this.renovationsCourantes.push({ ...this.nouvelleReno });
    this.nouvelleReno = {
      nomBatiment: '',
      typeTravaux: '',
      dateTravaux: '',
      typeBatiment: '',
      surface: null,
      dureeAmortissement: null
    };
  }

  ajouterMobilier(): void {
    this.mobiliersAjoutes.push({ ...this.nouveauMobilier });
    this.nouveauMobilier = {
      type: '',
      nombre: null,
      poids: null,
      dureeAmortissement: null
    };
  }

  supprimerBatiment(index: number): void {
    this.batimentsAjoutes.splice(index, 1);
  }

  supprimerRenovation(index: number): void {
    this.renovationsCourantes.splice(index, 1);
  }

  supprimerMobilier(index: number): void {
    this.mobiliersAjoutes.splice(index, 1);
  }
}
