import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { EmmissionsFugtivesService } from './emiss-fugi.service';
import { FormsModule } from '@angular/forms';
import { TypeFluide } from '../../../models/typeFluide.model';
import { TypeMachine } from '../../../models/typeMachine';
import { TypeFluideLabels } from '../../../models/typeFluide-label';
import { TypeMachineLabels} from '../../../models/type-machine-labels'

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
  private route = inject(ActivatedRoute); // Récupération des paramètres de l'URL
  private authService = inject(AuthService);
  emmissionFugitiveOngletId: string = '';
  noData: boolean = false;
  hasError: boolean = false;

  // TypeFluideLabelEntries contenant les objets { value, label }
  typeFluideLabelEntries = Object.keys(TypeFluide).map(key => {
    return { value: TypeFluide[key as keyof typeof TypeFluide], label: TypeFluideLabels[TypeFluide[key as keyof typeof TypeFluide]] };
  });

  typeMachineLabelEntries = Object.keys(TypeMachine).map(key => {
    return { value: TypeMachine[key as keyof typeof TypeMachine], label: TypeMachineLabels[TypeMachine[key as keyof typeof TypeMachine]] };
  });

  machines: any[] = [];
  newMachine: any = {
    descriptionMachine: '',
    typeFluide: '',
    quantiteFluideKg: null,
    tauxDeFuiteConnu: true,
    tauxDeFuite: null,
    typeMachine: ''
  };

  fuiteReelleConnue: boolean = true;

  constructor(private emmissionsFugtivesService: EmmissionsFugtivesService) {}

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

    this.emmissionsFugtivesService.getMachines("test", headers).subscribe({
      next: (data) => {
        console.log("Réponse brute de l'API :", data);

        const rawMachines = data.machinesEmissionFugitive;

        if (!Array.isArray(rawMachines)) {
          console.error("Les machines ne sont pas un tableau !");
          this.noData = true;
          return;
        }

        this.machines = rawMachines.map((machine: any) => ({
          ...machine,
          typeFluideLabel: TypeFluideLabels[machine.typeFluide as keyof typeof TypeFluideLabels] ?? machine.typeFluide,
          typeMachineLabel: TypeMachineLabels[machine.typeMachine as keyof typeof TypeMachineLabels] ?? machine.typeMachine,
        }));

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
    const token = this.authService.getToken(); // Récupère le token

    // Avant d'ajouter la machine, il faut convertir le label en valeur de l'énumération
    const labelToValueFluide = (label: string) => {
      return Object.keys(TypeFluide).find(key => TypeFluideLabels[TypeFluide[key as keyof typeof TypeFluide]] === label);
    };

    const labelToValueMachine = (label: string) => {
      return Object.keys(TypeMachine).find(key => TypeMachineLabels[TypeMachine[key as keyof typeof TypeMachine]] === label);
    };

    const machineToAdd = { ...this.newMachine };

// Conversion des labels
    machineToAdd.typeFluide = labelToValueFluide(machineToAdd.typeFluide);

    if (this.newMachine.tauxDeFuiteConnu) {
      machineToAdd.typeMachine = "NA"; // Cas où on ne veut pas de saisie
    } else {
      machineToAdd.typeMachine = labelToValueMachine(machineToAdd.typeMachine); // Cas normal
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Ajoute le token d'authentification
    };

    console.log(machineToAdd);
    this.emmissionsFugtivesService.addMachine(this.emmissionFugitiveOngletId, machineToAdd, headers).subscribe(() => {
      this.loadMachines();
      this.resetForm();
    });
  }

  supprimerMachine(machine: any) {
    const token = this.authService.getToken(); // Récupère le token

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Ajoute le token d'authentification
    };
    if (machine.id) {
      this.emmissionsFugtivesService.deleteMachine(this.emmissionFugitiveOngletId, machine.id, headers).subscribe({
        next: () => {
          this.machines = this.machines.filter(m => m.id !== machine.id);
          this.loadMachines();
        },
        error: (err) => {
          console.error("Erreur lors de la suppression", err);
          // Optionnel : afficher une erreur à l'utilisateur
        }
      });
    } else {
      // Suppression locale si pas encore sauvegardée
      this.machines = this.machines.filter(m => m !== machine);
    }
  }

  resetForm() {
    this.newMachine = {
      descriptionMachine: '',
      typeFluide: '',
      quantiteFluideKg: null,
      tauxDeFuiteConnu: true,
      tauxDeFuite: null,
      typeMachine: ''
    };
    this.fuiteReelleConnue = true;
  }
}
