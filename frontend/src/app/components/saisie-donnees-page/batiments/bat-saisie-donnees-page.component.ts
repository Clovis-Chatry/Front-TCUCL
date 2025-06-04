import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../../services/auth.service';
import {ApiEndpoints} from '../../../services/api-endpoints';
import {
  EnumBatiment_TypeBatiment,
  EnumBatiment_TypeStructure,
  EnumBatiment_TypeTravaux,
  EnumBatiment_TypeMobilier
} from '../../../models/bat.enum';

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
  travauxTypes = Object.values(EnumBatiment_TypeTravaux);

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
  ];

  travauxTypesLibelles = [
    { value: EnumBatiment_TypeTravaux.CHAUFFAGE_VENTILATION_CLIMATISATION, label:'Chauffage - Ventilation - Climatisation' },
    { value: EnumBatiment_TypeTravaux.CLOISONNEMENT_DOUBLAGE, label:'Cloisonnement - Doublage' },
    { value: EnumBatiment_TypeTravaux.FACADES_ET_MENUISERIES, label:'Facades - Menuiseries' },
    { value: EnumBatiment_TypeTravaux.SUPERSTRUCTURES_MAÇONNERIE, label:'Superstructures - Maçonnerie' },
    { value: EnumBatiment_TypeTravaux.SANITAIRES, label:'Sanitaires' },
    { value: EnumBatiment_TypeTravaux.VOIRIE, label:'Voirie' },
    { value: EnumBatiment_TypeTravaux.COUVERTURE_ETANCHÉITÉ, label:'Couverture - Etanchéité' },
    { value: EnumBatiment_TypeTravaux.ELECTRICITE, label:'Electricité' },
    { value: EnumBatiment_TypeTravaux.REVETEMENTS_DE_SOLS_ET_MURS, label:'Revetements de sols et murs' },
    { value: EnumBatiment_TypeTravaux.FONDATIONS_INFRASTRUCTURES, label:'Fondations - Infrastructures' },
    { value: EnumBatiment_TypeTravaux.COMMUNICATION, label:'Communication' },
  ]

  mobilierTypesLibelles = [
    { value: EnumBatiment_TypeMobilier.ARMOIRE, label: 'Armoire' },
    { value: EnumBatiment_TypeMobilier.CANAPE, label: 'Canapé' },
    { value: EnumBatiment_TypeMobilier.CHAISES_BOIS, label: 'Chaises en bois' },
    { value: EnumBatiment_TypeMobilier.CHAISES_BOIS_TEXTILE, label: 'Chaises en bois et textile' },
    { value: EnumBatiment_TypeMobilier.CHAISES_PLASTIQUES, label: 'Chaises plastique' },
    { value: EnumBatiment_TypeMobilier.CHAISES_MOYENNE, label: 'Chaises moyenne' },
    { value: EnumBatiment_TypeMobilier.LIT, label: 'Lit' },
    { value: EnumBatiment_TypeMobilier.TABLE, label: 'Table' },
    { value: EnumBatiment_TypeMobilier.ASPIRATEUR_CLASSIQUE, label: 'Aspirateur classique' },
    { value: EnumBatiment_TypeMobilier.ASPIRATEUR_TRAINEAU_PRO, label: 'Aspirateur traineau-pro' },
    { value: EnumBatiment_TypeMobilier.CLIMATISEUR_MOBILE, label: 'Climatiseur mobile' },
    { value: EnumBatiment_TypeMobilier.CONGELATEUR_ARMOR, label: 'Congelateur armoire' },
    { value: EnumBatiment_TypeMobilier.CONGELATEUR_COFFRE, label: 'Congelateur coffre' },
    { value: EnumBatiment_TypeMobilier.LAVELINGE_7KG, label: 'Lave-linge 7kg' },
    { value: EnumBatiment_TypeMobilier.SECHE_LINGE_6KG, label: 'Sèche-linge 6kg' },
    { value: EnumBatiment_TypeMobilier.LAVE_VAISSELLE, label: 'Lave-vaisselle' },
    { value: EnumBatiment_TypeMobilier.MACHINE_A_CAFE_EXPRESSO, label: 'Machine à café expresso' },
    { value: EnumBatiment_TypeMobilier.MACHINE_A_CAFE_FILTRE, label: 'Machine à café filtre' },
    { value: EnumBatiment_TypeMobilier.MACHINE_A_CAFE_DOSETTES, label: 'Machine à café dosettes' },
    { value: EnumBatiment_TypeMobilier.MACHINE_A_CAFE_MOYENNE, label: 'Machine à café moyenne' },
    { value: EnumBatiment_TypeMobilier.BOUILLOIRE, label: 'Bouilloire' },
    { value: EnumBatiment_TypeMobilier.MICRO_ONDES, label: 'Micro-ondes' },
    { value: EnumBatiment_TypeMobilier.PLAQUES_DE_CUISSON, label: 'Plaques de cuisson' },
    { value: EnumBatiment_TypeMobilier.RADIATEUR_ELECTRIQUE, label: 'Radiateur électrique' },
    { value: EnumBatiment_TypeMobilier.REFRIGERATEUR, label: 'Réfrigirateur' },
    { value: EnumBatiment_TypeMobilier.AUTRE_MOBILIER_EN_EUROS, label: 'Autre mobilier en euros' },
    { value: EnumBatiment_TypeMobilier.AUTRE_MOBILIER_EN_TONNES, label: 'Autre mobilier en tonnes' }
  ];


  getLibelleTypeBatiment(type: string): string {
    const item = this.batimentTypesLibelles.find(t => t.value === type);
    return item ? item.label : type;
  }

  getLibelleTypeStructure(structure: string): string {
    const item = this.structureTypesLibelles.find(t => t.value === structure);
    return item ? item.label : structure;
  }

  getLibelleTypeTravaux(travaux: string): string {
    const item = this.travauxTypesLibelles.find(t => t.value === travaux);
    return item ? item.label : travaux;
  }

  getLibelleTypeMobilier(mobilier: string): string {
    const item = this.mobilierTypesLibelles.find(t => t.value === mobilier);
    return item ? item.label : mobilier;
  }

  getAuthHeaders(): { [key: string]: string } {
    const token = this.authService.getToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
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
    typeBatiment: '',
    surfaceConcernee: null,
    dureeAmortissement: null
  };

  renovationsCourantes: any[] = [];

  // Mobilier (section 3)
  nouveauMobilier: any = {
    dateAjout: '',
    mobilier: '',
    quantite: '',
    poidsDuProduit: '',
    dureeAmortissement: ''
  };

  mobiliersAjoutes: any[] = [];

  getDateAujourdhui(): string {
    const aujourdHui = new Date();
    const annee = aujourdHui.getFullYear();
    const mois = String(aujourdHui.getMonth() + 1).padStart(2, '0');
    const jour = String(aujourdHui.getDate()).padStart(2, '0');
    return `${annee}-${mois}-${jour}`;
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.batimentOngletId = params.get('id') || '';
      this.loadData();
    });
  }

  loadData(): void {
    const headers = this.getAuthHeaders();
    this.http.get<any>(
      ApiEndpoints.BatimentsOnglet.getBatimentImmobilisationMobilier(this.batimentOngletId),
      { headers }
    ).subscribe({
      next: (data) => {
        console.log("Réponse API :", data);
        this.batimentsAjoutes = data.batimentsExistantOuNeufConstruits || [];
        this.renovationsCourantes = data.entretiensCourants || [];
        this.mobiliersAjoutes = data.mobiliers || [];
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des données :', error);
      }
    });
  }

  ajouterBatiment(): void {
    const headers = this.getAuthHeaders();
    const batimentAAjouter = { ...this.nouveauBatiment}
    this.http.post(ApiEndpoints.BatimentsOnglet.ajouterBatiment(this.batimentOngletId), batimentAAjouter, { headers }).subscribe(() => {
      this.loadData();
      this.resetFormBatiment();
    })
  }

  ajouterEntretien(): void {
    const entretienAAjouter = { ...this.nouvelleReno};
    entretienAAjouter.dateAjout = this.getDateAujourdhui();
    const headers = this.getAuthHeaders();
    this.http.post(ApiEndpoints.BatimentsOnglet.ajouterEntretien(this.batimentOngletId), entretienAAjouter, { headers }).subscribe(() => {
      this.loadData();
      this.resetFormRenovcation();
    })
  }

  ajouterMobilier(): void {
    const mobilierAAjouter = { ...this.nouveauMobilier};
    mobilierAAjouter.dateAjout = this.getDateAujourdhui();
    // mobilierAAjouter.dateAjout = this.getDateAujourdhui();
    const headers = this.getAuthHeaders();
    this.http.post(ApiEndpoints.BatimentsOnglet.ajouterMobilier(this.batimentOngletId), mobilierAAjouter, { headers }).subscribe(() => {
      this.loadData();
      this.resetFormMobilier();
    })
  }

  supprimerBatiment(index: number): void {
    const headers = this.getAuthHeaders();
    const batiment = this.batimentsAjoutes[index];

    if (batiment && batiment.id) {
      this.http.delete(ApiEndpoints.BatimentsOnglet.supprimerBatiment(this.batimentOngletId, batiment.id), { headers }).subscribe({
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
    const headers = this.getAuthHeaders();
    const renovation = this.renovationsCourantes[index];

    if (renovation && renovation.id) {
      this.http.delete(ApiEndpoints.BatimentsOnglet.supprimerEntretien(this.batimentOngletId, renovation.id), { headers }).subscribe({
        next: () => {
          this.renovationsCourantes.splice(index, 1);
          this.loadData();
        },
        error: (err) => {
          console.error("Erreur lors de la suppression", err);
        }
      });
    }
  }

  supprimerMobilier(index: number): void {
    const headers = this.getAuthHeaders();
    const mobilier = this.mobiliersAjoutes[index];

    if (mobilier && mobilier.id) {
      this.http.delete(ApiEndpoints.BatimentsOnglet.supprimerMobilier(this.batimentOngletId, mobilier.id), { headers }).subscribe({
        next: () => {
          this.mobiliersAjoutes.splice(index, 1);
          this.loadData();
        },
        error: (err) => {
          console.error("Erreur lors de la suppression", err);
        }
      });
    }
    this.mobiliersAjoutes.splice(index, 1);
  }

  resetFormBatiment() {
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
    }
  }
  resetFormRenovcation() {
    this.nouvelleReno = {
      dateAjout: '',
      nom_adresse: '',
      typeTravaux: '',
      dateTravaux: '',
      typeBatiment: '',
      surfaceConcernee: null,
      dureeAmortissement: null
    };
  }

  resetFormMobilier() {
    this.nouveauMobilier = {
      dateAjout: '',
      mobilier: '',
      quantite: '',
      poidsDuProduit: '',
      dureeAmortissement: ''
    };
  }
}
