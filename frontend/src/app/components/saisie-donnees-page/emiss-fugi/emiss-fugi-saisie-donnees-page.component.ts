import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {EmmissionsFugtivesService} from './emiss-fugi.service';
import {FormsModule} from '@angular/forms';
import {TypeFluide} from '../../../models/enums/typeFluide.enum';
import {TypeMachineEnum} from '../../../models/enums/typeMachine.enum';
import {TypeFluideLabels} from '../../../models/typeFluide-label';
import { NoNegativeDirective } from '../../../directives/no-negative.directive';
import {TypeMachineLabels} from '../../../models/type-machine-labels'

@Component({
  selector: 'app-saisie-donnees-page',
  standalone: true,
  templateUrl: './emiss-fugi-saisie-donnees-page.component.html',
  styleUrls: ['./emiss-fugi-saisie-donnees-page.component.scss'],
  imports: [NoNegativeDirective, 
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
  fluideTypes = Object.values(TypeFluide);

  fluideTypesLibelles = [
    { value: TypeFluide.CH4, label: "CH4" },
    { value: TypeFluide.N20, label: "N20" },
    { value: TypeFluide.R134a, label: "R134a" },
    { value: TypeFluide.R404a, label: "R404a" },
    { value: TypeFluide.R407a, label: "R407a" },
    { value: TypeFluide.R407c, label: "R407c" },
    { value: TypeFluide.R410a, label: "R410a" },
    { value: TypeFluide.R417a, label: "R417a" },
    { value: TypeFluide.R422a, label: "R422a" },
    { value: TypeFluide.R422d, label: "R422d" },
    { value: TypeFluide.R427a, label: "R427a" },
    { value: TypeFluide.R507, label: "R507" },
    { value: TypeFluide.R507a, label: "R507a" },
    { value: TypeFluide.HFC_125, label: "HFC - 125" },
    { value: TypeFluide.HFC_134, label: "HFC - 134" },
    { value: TypeFluide.HFC_134a, label: "HFC - 134a" },
    { value: TypeFluide.HFC_143, label: "HFC - 143" },
    { value: TypeFluide.HFC_143a, label: "HFC - 143a" },
    { value: TypeFluide.HFC_152a, label: "HFC - 152a" },
    { value: TypeFluide.HFC_227ea, label: "HFC - 227ea" },
    { value: TypeFluide.HFC_23, label: "HFC - 23" },
    { value: TypeFluide.HFC_236fa, label: "HFC - 236fa" },
    { value: TypeFluide.HFC_245ca, label: "HFC - 245ca" },
    { value: TypeFluide.HFC_32, label: "HFC - 32" },
    { value: TypeFluide.HFC_41, label: "HFC - 41" },
    { value: TypeFluide.HFC_43_10mee, label: "HFC - 43 - 10mee" },
    { value: TypeFluide.PERFLUOROBUTANE_R3110, label: "Perfluorobutane = R3110" },
    { value: TypeFluide.PERFLUOROMETHANE_R14, label: "Perfluoromethane = R14" },
    { value: TypeFluide.PERFLUOROPROPANE_R218, label: "Perfluoropropane = R218" },
    { value: TypeFluide.PERFLUOROPENTANE_R4112, label: "Perfluoropentane = R4112" },
    { value: TypeFluide.PERFLUOROCYCLOBUTANE_R318, label: "Perfluorocyclobutane = R318" },
    { value: TypeFluide.PERFLUOROETHANE_R116, label: "Perfluoroethane = R116" },
    { value: TypeFluide.PERFLUOROHEXANE_R5114, label: "Perfluorohexane = R5114" },
    { value: TypeFluide.SF6, label: "SF6" },
    { value: TypeFluide.NF3, label: "NF3" },
    { value: TypeFluide.R11_CFC_HORS_KYOTO, label: "R11 - CFC hors kyoto" },
    { value: TypeFluide.R12_CFC_HORS_KYOTO, label: "R12 - CFC hors kyoto" },
    { value: TypeFluide.R113, label: "R113" },
    { value: TypeFluide.R114, label: "R114" },
    { value: TypeFluide.R115, label: "R115" },
    { value: TypeFluide.R122, label: "R122" },
    { value: TypeFluide.R122a, label: "R122a" },
    { value: TypeFluide.R123, label: "R123" },
    { value: TypeFluide.R123a, label: "R123a" },
    { value: TypeFluide.R124, label: "R124" },
    { value: TypeFluide.R13, label: "R13" },
    { value: TypeFluide.R132c, label: "R132c" },
    { value: TypeFluide.R141b, label: "R141b" },
    { value: TypeFluide.R142b, label: "R142b" },
    { value: TypeFluide.R21, label: "R21" },
    { value: TypeFluide.R225ca, label: "R225ca" },
    { value: TypeFluide.R225cb, label: "R225cb" },
    { value: TypeFluide.R502_CFC_HORS_KYOTO, label: "R502 - CFC hors kyoto" },
    { value: TypeFluide.R22_HCFC_HORS_KYOTO, label: "R22 - HCFC hors kyoto" },
    { value: TypeFluide.R401a_HCFC_HORS_KYOTO, label: "R401a - HCFC hors kyoto" },
    { value: TypeFluide.R408a_HCFC_HORS_KYOTO, label: "R408a - HCFC hors kyoto" },
    { value: TypeFluide.TETRACHLOROMETHANE, label: "Tétrachlorométhane" },
    { value: TypeFluide.NOx, label: "NOx" },
    { value: TypeFluide.BROMURE_DE_METHYLE, label: "Bromure de méthyle" },
    { value: TypeFluide.CHLOROFORME_DE_METHYLE, label: "Chloroforme de méthyle" },
    { value: TypeFluide.HALON_1211, label: "Halon 1211" },
    { value: TypeFluide.HALON_1301, label: "Halon 1301" },
    { value: TypeFluide.HALON_2402, label: "Halon 2402" },
    { value: TypeFluide.DICHLOROMETHANE, label: "Dichlorométhane" },
  ]

    getLibelleTypeFluide(type: string): string {
    const item = this.fluideTypesLibelles.find(t => t.value === type);
    return item ? item.label : type;
  }
  // TypeFluideLabelEntries contenant les objets { value, label }
  typeFluideLabelEntries = Object.keys(TypeFluide).map(key => {
    return { value: TypeFluide[key as keyof typeof TypeFluide], label: TypeFluideLabels[TypeFluide[key as keyof typeof TypeFluide]] };
  });

  typeMachineLabelEntries = Object.keys(TypeMachineEnum).map(key => {
    return { value: TypeMachineEnum[key as keyof typeof TypeMachineEnum], label: TypeMachineLabels[TypeMachineEnum[key as keyof typeof TypeMachineEnum]] };
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
    this.route.paramMap.subscribe(params => {
      this.emmissionFugitiveOngletId = params.get('id') || '';
      this.loadMachines();
    });
  }

  loadMachines() {
    const token = this.authService.getToken();
    if (!token) {
      return;
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // 🔥 Ajout du token dans l'en-tête
    };

    this.emmissionsFugtivesService.getMachines(this.emmissionFugitiveOngletId, headers).subscribe({
      next: (data) => {
        const rawMachines = data.machinesEmissionFugitive;

        if (!Array.isArray(rawMachines)) {
          this.noData = true;
          return;
        }
        function normalizeEnumValue(value: string): string {
          const normalized = value?.toLowerCase().replace(/[_\-]/g, '');
          return <string>normalized;
        }


        this.machines = rawMachines.map((machine: any) => {
          const normalizedFluide = normalizeEnumValue(machine.typeFluide);
          const normalizedMachine = normalizeEnumValue(machine.typeMachine);

          const fluideEnumValue = Object.values(TypeFluide).find(
            val => normalizeEnumValue(val) === normalizedFluide
          );

          const machineEnumValue = Object.values(TypeMachineEnum).find(
            val => normalizeEnumValue(val) === normalizedMachine
          );

          return {
            ...machine,
            typeFluideLabel: TypeFluideLabels[fluideEnumValue as TypeFluide] ?? machine.typeFluide,
            typeMachineLabel: TypeMachineLabels[machineEnumValue as TypeMachineEnum] ?? machine.typeMachine,
          };
        });


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
    const labelToValueMachine = (label: string) => {
      return Object.keys(TypeMachineEnum).find(key => TypeMachineLabels[TypeMachineEnum[key as keyof typeof TypeMachineEnum]] === label);
    };

    const machineToAdd = { ...this.newMachine };

// Conversion des labels
    if (this.newMachine.tauxDeFuiteConnu) {
      machineToAdd.typeMachine = "NA"; // Cas où on ne veut pas de saisie
    } else {
      machineToAdd.typeMachine = labelToValueMachine(machineToAdd.typeMachine); // Cas normal
    }

    if (this.newMachine.descriptionMachine.length > 100) {
      alert("La description ne doit pas dépasser 100 caractères.");
      return;
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Ajoute le token d'authentification
    };
    console.log(machineToAdd.typeFluide)
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
