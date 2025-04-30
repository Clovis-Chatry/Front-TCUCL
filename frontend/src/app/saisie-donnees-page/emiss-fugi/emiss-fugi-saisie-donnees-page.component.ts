import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {EmmissionsFugtivesService} from './emiss-fugi.service';
import {FormsModule} from '@angular/forms';
import {TypeFluide} from '../../models/typeFluide.model';
import {TypeMachineModel} from '../../models/typeMachine.model';

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
  noData: boolean = false;
  hasError: boolean = false;

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

  typesFluide: string[] = Object.values(TypeFluide);
  typesMachine: string[] = Object.values(TypeMachineModel); // à adapter

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

    const id = parseInt(this.emmissionFugitiveOngletId, 10);

    if (isNaN(id) || id <= 0) {
      console.warn("Impossible de récupérer les machines pour l'année précédente : ID invalide");
      this.noData = true;
      this.machines = [];
      return;
    }

    const previousId = (id - 1).toString();

    this.emmissionsFugtivesService.getMachines(previousId).subscribe({
      next: (data) => {
        this.machines = data;
        this.noData = this.machines.length === 0;
        this.hasError = false;
      },
        error: (err) => {
        console.error('Erreur API', err);
        this.hasError = true;
      }
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

  supprimerMachine(machine: any) {
    this.emmissionsFugtivesService.deleteMachine(this.emmissionFugitiveOngletId, machine.id).subscribe(() => {
      this.loadMachines();
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
