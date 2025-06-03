import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../../services/auth.service';
import {BatimentsService} from './bat.service';
import {ApiEndpoints} from '../../../services/api-endpoints';
import {EnumBatiment_TypeBatiment, EnumBatiment_TypeStructure} from '../../../models/bat.enum';

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
  batimentOngletId: string = '';
  batimentTypes = Object.values(EnumBatiment_TypeBatiment);
  structureTypes = Object.values(EnumBatiment_TypeStructure);

  batimentTypesLibelles = [
    { value: EnumBatiment_TypeBatiment.NA, label: 'Non renseigné' },
    { value: EnumBatiment_TypeBatiment.EQUIPEMENT_SPORTIF, label: 'Équipement sportif' },
    { value: EnumBatiment_TypeBatiment.LOGEMENT_COLLECTIF, label: 'Logement collectif' },
    { value: EnumBatiment_TypeBatiment.RESTAURATION, label: 'Restauration' },
    { value: EnumBatiment_TypeBatiment.ENSEIGNEMENT, label: 'Enseignement' },
    { value: EnumBatiment_TypeBatiment.HOPITAL, label: 'Hôpital' },
    { value: EnumBatiment_TypeBatiment.AUTRE, label: 'Autre' },
    { value: EnumBatiment_TypeBatiment.BUREAUX, label: 'Bureaux' }
  ];

  structureTypesLibelles = [
    { value: EnumBatiment_TypeStructure.NA, label: 'Non renseigné' },
    { value: EnumBatiment_TypeStructure.BETON, label: 'Béton' },
    { value: EnumBatiment_TypeStructure.BOIS, label: 'Bois' },
    { value: EnumBatiment_TypeStructure.MIXTE, label: 'Mixte' }
  ]

  getLibelleTypeBatiment(type: string): string {
    const item = this.batimentTypesLibelles.find(t => t.value === type);
    return item ? item.label : type;
  }

  getLibelleTypeStructure(structure: string): string {
    const item = this.structureTypesLibelles.find(t => t.value === structure);
    return item ? item.label : structure;
  }


  batiments: any[]= [];
  // Parc immobilier (section 1)
  nouveauBatiment: any = {
    nom_ou_adresse: '',
    dateConstruction: '',
    moinsDe50ans: null,
    renoComplete: null,
    dateDerniereGrosseRenovation: '',
    acvBatimentRealisee: null,
    emissionsGesReellesTCO2: null,
    typeBatiment: '',
    surfaceEnM2: null,
    typeStructure: '',
    acompleter: ''
  };

  batimentsAjoutes: any[] = [];

  // Entretien / rénovations (section 2)
  nouvelleReno: any = {
    dateAjout: '',
    nom_adresse: '',
    typeTravaux: '',
    dateTravaux: '',
    acvRenovationRealisee: null,
    emissionsGesReellesTCO2: null,
    typeBatiment: '',
    surfaceConcernee: null,
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

  constructor(private batimentsService: BatimentsService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.loadData();
    });
  }

  loadData(): void {
    const token = this.authService.getToken();

    if (!token) {
      console.error("Token d'authentification manquant");
      return;
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    this.http.get<any>(
      ApiEndpoints.BatimentsOnglet.getBatimentImmobilisationMobilier(this.batimentOngletId),
      { headers }
    ).subscribe({
      next: (data) => {
        console.log("Réponse API :", data);
        this.batimentsAjoutes = data.batimentsExistantOuNeufConstruits || [];
        this.renovationsCourantes = data.renovationsCourantes || [];
        this.renovationsPassees = data.renovationsPassees || [];
        this.mobiliersAjoutes = data.mobiliers || [];
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des données :', error);
      }
    });
    console.log("batimentsAjoutes =", this.batimentsAjoutes);
  }

  ajouterBatiment(): void {
    const token = this.authService.getToken();

    const batimentAAjouter = { ...this.nouveauBatiment}
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Ajoute le token d'authentification
    };
    this.http.post(ApiEndpoints.BatimentsOnglet.ajouterBatiment(this.batimentOngletId), batimentAAjouter, { headers }).subscribe(() => {
      this.loadData();
      this.resetForm();
    })
  }

  ajouterRenovation(): void {
    const token = this.authService.getToken();

    const batimentAAjouter = { ...this.nouveauBatiment}
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Ajoute le token d'authentification
    };
    this.http.post(ApiEndpoints.BatimentsOnglet.ajouterBatiment(this.batimentOngletId), batimentAAjouter, { headers }).subscribe(() => {
      this.loadData();
      this.resetForm();
    })
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
    const token = this.authService.getToken();

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    const batiment = this.batimentsAjoutes[index];

    if (batiment && batiment.id) {
      this.http.delete(ApiEndpoints.BatimentsOnglet.supprimerBatiment(batiment.id), { headers }).subscribe({
        next: () => {
          this.batimentsAjoutes.splice(index, 1);
          this.loadData();
        },
        error: (err) => {
          console.error("Erreur lors de la suppression", err);
        }
      });
    } else {
      // Si le bâtiment n'existe pas encore en base (non persisté), on le supprime juste localement
      this.batimentsAjoutes.splice(index, 1);
    }
  }


  supprimerRenovation(index: number): void {
    this.renovationsCourantes.splice(index, 1);
  }

  supprimerMobilier(index: number): void {
    this.mobiliersAjoutes.splice(index, 1);
  }

  resetForm() {
    this.nouveauBatiment = {
      nom_ou_adresse: '',
      dateConstruction: '',
      moinsDe50ans: null,
      renoComplete: null,
      dateDerniereGrosseRenovation: '',
      acvBatimentRealisee: null,
      emissionsGesReellesTCO2: null,
      typeBatiment: '',
      surfaceEnM2: null,
      typeStructure: '',
      acompleter: ''
    }
  }
}
