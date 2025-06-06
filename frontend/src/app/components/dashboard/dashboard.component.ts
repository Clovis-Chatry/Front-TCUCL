import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OngletStatusService } from '../../services/onglet-status.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class DashboardComponent {
  currentYear: number = 2024;

    onglets = [
      { label: 'Energie', status: false, path: 'energieOnglet' },
      { label: 'Emissions fugitives', status: true, path: 'emissionFugitiveOnglet' },
      { label: 'Mobilité dom-trav', status: true, path: 'mobiliteDomicileTravailOnglet' },
      { label: 'Autre mob fr', status: false, path: 'autreMobFrOnglet' },
      { label: 'Mob internatio', status: false, path: 'mobInternationalOnglet' },
      { label: 'Bâtiments', status: true, path: 'batimentImmobilisationMobilierOnglet' },
      { label: 'Parkings', status: true, path: 'parkingVoirieOnglet' },
      { label: 'Auto', status: true, path: 'vehiculeOnglet' },
      { label: 'Numérique', status: true, path: 'numeriqueOnglet' },
      { label: 'Autres immob', status: false, path: 'autreImmobilisationOnglet' },
      { label: 'Achats', status: false, path: 'achatOnglet' },
      { label: 'Déchets', status: true, path: 'dechetOnglet' }
    ];

  constructor(private router: Router, private statusService: OngletStatusService) {}

  getStatus(path: string): boolean {
    return this.statusService.getStatus(path);
  }

  goToSaisie(path: string): void {
    this.router.navigate([`/${path}/${this.currentYear}`]);
  }


 goToEnergie() {
    this.router.navigate([`/energieOnglet/2`]);
  }
};
