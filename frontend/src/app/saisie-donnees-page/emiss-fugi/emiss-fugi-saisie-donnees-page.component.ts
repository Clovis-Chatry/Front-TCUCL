import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {EmmissionsFugtivesService} from './emiss-fugi.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-saisie-donnees-page',
  standalone: true,
  templateUrl: './emiss-fugi-saisie-donnees-page.component.html',
  styleUrls: ['./emiss-fugi-saisie-donnees-page.component.scss'],
  imports: [
    FormsModule,
    CommonModule
  ]
})
export class EmissFugiSaisieDonneesPageComponent implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute); // Récupération des paramètres de l'URL
  private authService = inject(AuthService);
  emmissionFugitiveOngletId: string = '';

  machines: any[] = [];
  newMachine: any = {
    description: '',
    typeFluide: '',
    quantiteFluide: null,
    tauxFuiteReelConnu: true,
    tauxFuite: null,
    typeMachine: ''
  };
  fuiteReelleConnue: boolean = true;

  typesFluide: string[] = ['Eau', 'Air', 'Huile', 'Gaz']; // à adapter
  typesMachine: string[] = ['Compresseur', 'Pompe', 'Circuit fermé', 'Générateur']; // à adapter

  constructor(private emmissionsFugtivesService: EmmissionsFugtivesService) {
  }

  ngOnInit() {
    this.emmissionFugitiveOngletId = this.route.snapshot.paramMap.get('id')!;
    this.loadMachines();
  }

  loadMachines() {
    const token = this.authService.getToken(); // 🔥 Récupération du token
    if (!token) {
      console.error("Token d'authentification manquant");
      return;
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // 🔥 Ajout du token dans l'en-tête
    };

    this.emmissionsFugtivesService.getMachines(this.emmissionFugitiveOngletId).subscribe(data => {
      this.machines = data;
    });
  }

  ajouterMachine() {
    const machineToAdd = {...this.newMachine};
    if (!this.fuiteReelleConnue) {
      machineToAdd.tauxFuite = null; // Pas de taux si fuite inconnue
    } else {
      machineToAdd.typeMachine = null; // Pas de typeMachine si fuite connue
    }

    this.emmissionsFugtivesService.addMachine(this.emmissionFugitiveOngletId, machineToAdd).subscribe(() => {
      this.loadMachines();
      this.resetForm();
    });
  }

  resetForm() {
    this.newMachine = {
      description: '',
      typeFluide: '',
      quantiteFluide: null,
      tauxFuiteReelConnu: true,
      tauxFuite: null,
      typeMachine: ''
    };
    this.fuiteReelleConnue = true;
  }
}
