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
    { label: 'Emissions fugitives', status: true, path: 'emissionsFugitivesOnglet' },
    { label: 'Mobilité dom-trav', status: true, path: 'mobiliteDomTravOnglet' },
    { label: 'Autre mob fr', status: false, path: 'autreMobFrOnglet' },
    { label: 'Mob internatio', status: false, path: 'mobiliteInternationaleOnglet' },
    { label: 'Bâtiments', status: true, path: 'batimentsOnglet' },
    { label: 'Parkings', status: true, path: 'parkingsOnglet' },
    { label: 'Auto', status: true, path: 'autoOnglet' },
    { label: 'Numérique', status: true, path: 'numeriqueOnglet' },
    { label: 'Autres immob', status: false, path: 'immobOnglet' },
    { label: 'Achats', status: false, path: 'achatsOnglet' },
    { label: 'Déchets', status: true, path: 'dechetsOnglet' }
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
