import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SaveFooterComponent } from '../../save-footer/save-footer.component';
import { AuthService } from '../../../services/auth.service';
import { ApiEndpoints } from '../../../services/api-endpoints';
import { OngletStatusService } from '../../../services/onglet-status.service';

@Component({
  selector: 'app-saisie-donnees-page',
  standalone: true,
  templateUrl: './immob-donnees-page.component.html',
  styleUrls: ['./immob-donnees-page.component.scss'],
  imports: [FormsModule, HttpClientModule, CommonModule, SaveFooterComponent]
})
export class AutreImmobilisationPageComponent implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private statusService = inject(OngletStatusService);

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

  estTermine = false;

  onEstTermineChange(value: boolean): void {
    this.estTermine = value;
    this.updateData();
  }

  ngOnInit() {
    this.estTermine = this.statusService.getStatus('immobOnglet');
    this.statusService.statuses$.subscribe(s => {
      this.estTermine = s['immobOnglet'] ?? false;
    });
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
    this.updateData();
  }

  updateData(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const token = this.authService.getToken();
    if (!id || !token) return;

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    };

    this.http.patch(ApiEndpoints.ImmobOnglet.update(id), { ...this.items, estTermine: this.estTermine }, { headers }).subscribe({
      error: err => console.error('PATCH immob echoue', err)
    });
  }
}
