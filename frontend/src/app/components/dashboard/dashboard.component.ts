import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OngletStatusService } from '../../services/onglet-status.service';
import { OngletService } from '../header-saisie-donnees/onglet.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class DashboardComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  ongletIdMap: { [key: string]: number } = {};
  entiteId!: number;

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

  constructor(
    private router: Router,
    private statusService: OngletStatusService,
    private ongletService: OngletService,
    private auth: AuthService
  ) {
    const user = this.auth.getUserInfo()();
    if (user?.entiteId) {
      this.entiteId = user.entiteId;
    } else {
      console.error('Impossible de récupérer l\'entiteId de l\'utilisateur.');
    }
  }

  ngOnInit(): void {
    this.loadOngletIds();
  }

  loadOngletIds(): void {
    this.ongletService.getOngletIds(this.entiteId, this.currentYear)?.subscribe({
      next: (result) => {
        this.ongletIdMap = result;
      },
      error: (err) => {
        console.error('Erreur récupération onglet IDs:', err);
      }
    });
  }

  getStatus(path: string): boolean {
    return this.statusService.getStatus(path);
  }

  goToSaisie(path: string): void {
    const id = this.ongletIdMap[path];
    if (!id) {
      console.error('ID introuvable pour l\'onglet', path);
      return;
    }
    this.router.navigate([`/${path}/${id}`]);
  }


  goToEnergie() {
    const id = this.ongletIdMap['energieOnglet'];
    if (!id) {
      console.error('ID introuvable pour l\'onglet energieOnglet');
      return;
    }
    this.router.navigate([`/energieOnglet/${id}`]);
  }
};
