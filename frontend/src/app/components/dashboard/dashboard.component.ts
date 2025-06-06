import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OngletStatusService } from '../../services/onglet-status.service';
import { OngletService } from '../header-saisie-donnees/onglet.service';
import { AnneeService} from '../../services/annee.service';
import {AuthService} from '../../services/auth.service';

type YearRange = { label: string; value: number };

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class DashboardComponent {
  currentYear: number;
  selectedYear: number;
  years: YearRange[] = [];


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

  constructor(
    private router: Router,
    private statusService: OngletStatusService,
    private ongletService: OngletService,
    private yearService: AnneeService,
    private auth: AuthService
  ) {
    this.currentYear = new Date().getFullYear();
    this.selectedYear = this.currentYear;
    const user = this.auth.getUserInfo()();
    if (user?.entiteId) {
      this.entiteId = user.entiteId;
    } else {
      console.error('Impossible de récupérer l’entiteId de l’utilisateur.');
    }
  }
  @Input() entiteId!: number;
  ongletIdMap: { [key: string]: number } = {};

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
    this.years = Array.from({ length: this.currentYear - 2018 }, (_, i) => {
      const end = this.currentYear - i;
      const start = end - 1;
      return { label: `${start}-${end}`, value: end };
    });

    this.selectedYear = this.yearService.getSelectedYear();

    this.loadOngletIds();
  }

  getStatus(path: string): boolean {
    return this.statusService.getStatus(path);
  }

  goToSaisie(path: string): void {
    this.router.navigate([`/${path}/${this.currentYear}`]);
  }

  goToEnergieAvecAnnee(): void {
    this.ongletService.getOngletIds(this.entiteId, this.selectedYear)?.subscribe({
      next: (result) => {
        this.ongletIdMap = result;
        const ongletId = this.ongletIdMap['energieOnglet'];
        if (ongletId) {
          this.router.navigate([`/energieOnglet/${ongletId}`]);
        } else {
          console.error('ID onglet énergie introuvable pour l’année', this.selectedYear);
        }
      },
      error: (err) => {
        console.error('Erreur récupération onglet IDs:', err);
      }
    });
  }



  goToEnergie() {
    this.router.navigate([`/energieOnglet/2`]);
  }

  onYearChange(newYear: number): void {
    this.selectedYear = newYear;
    this.yearService.setSelectedYear(newYear);
    this.loadOngletIds();
  }

  loadOngletIds(): void {
    this.ongletService.getOngletIds(this.entiteId, this.selectedYear)?.subscribe({
      next: (result) => {
        this.ongletIdMap = result;
      },
      error: (err) => {
        console.error('Erreur récupération onglet IDs:', err);
      }
    });
  }
};
