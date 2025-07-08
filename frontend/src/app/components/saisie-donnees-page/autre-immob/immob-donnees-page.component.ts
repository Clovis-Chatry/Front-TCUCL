import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { ApiEndpoints } from '../../../services/api-endpoints';

@Component({
  selector: 'app-saisie-donnees-page',
  standalone: true,
  templateUrl: './immob-donnees-page.component.html',
  styleUrls: ['./immob-donnees-page.component.scss'],
  imports: [FormsModule, HttpClientModule, CommonModule]
})
export class AutreImmobilisationPageComponent implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  items: any = {
    // Photovoltaïque
    hasPanneaux: false,
    cablage: null,
    structure: null,

    // Installation PV
    pvInstallationPuissance: null,
    pvInstallationDuree: null,
    pvInstallationGESConnu: '',
    pvInstallationGESReel: null,

    // Panneaux
    pvPanneauxPuissance: null,
    pvPanneauxDuree: null,
    pvPanneauxGESConnu: '',
    pvPanneauxGESReel: null,

    // Onduleurs
    pvOnduleursPuissance: null,
    pvOnduleursDuree: null,
    pvOnduleursGESConnu: '',
    pvOnduleursGESReel: null,

    // Machines
    machinesElectriques: false,
    machineType: '',
    machineNombre: null,
    machinePoids: null,
    machineAmortissement: null,
    machineGESConnu: '',
    machineGESReel: null,

    machines: []
  };

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadData(id);
      }
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
  
    this.http.get<any>(ApiEndpoints.ImmobOnglet.getById(id), { headers }).subscribe(
      (data) => {
        this.items = { ...this.items, ...data };
      },
      (error) => {
        console.error("Erreur lors du chargement des données", error);
      }
    );
  }  

  ajouterMachine() {
    this.items.machines.push({
      nom: this.items.machineType,
      nombre: this.items.machineNombre,
      poids: this.items.machinePoids,
      amortissement: this.items.machineAmortissement,
      gesConnu: this.items.machineGESConnu,
      gesReel: this.items.machineGESReel
    });

    // Réinitialiser les champs
    this.items.machineType = '';
    this.items.machineNombre = null;
    this.items.machinePoids = null;
    this.items.machineAmortissement = null;
    this.items.machineGESConnu = '';
    this.items.machineGESReel = null;
  }

  supprimerMachine(index: number): void {
    this.items.machines.splice(index, 1);
  }
}
