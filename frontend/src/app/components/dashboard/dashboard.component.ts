import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OngletStatusService } from '../../services/onglet-status.service';
import { OngletService } from '../header-saisie-donnees/onglet.service';
import { AnneeService} from '../../services/annee.service';
import {AuthService} from '../../services/auth.service';
import {ApiEndpoints} from '../../services/api-endpoints';

const extractRoute = (url: string): string =>
  url.split('/').slice(3).join('/').replace(/\/$/, '');

type YearRange = { label: string; value: number };

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class DashboardComponent implements OnInit {
  currentYear: number;
  selectedYear: number;
  years: YearRange[] = [];

  onglets = [
    {
      label: 'Energie',
      statusKey: 'energieOnglet',
      route: extractRoute(ApiEndpoints.EnergieOnglet.getById(''))
    },
    {
      label: 'Emissions fugitives',
      statusKey: 'emissionsFugitivesOnglet',
      route: extractRoute(ApiEndpoints.EmissionFugitivesOnglet.update(''))
    },
    {
      label: 'Mobilité dom-trav',
      statusKey: 'mobiliteDomTravOnglet',
      route: extractRoute(ApiEndpoints.DomTravOnglet.getById(''))
    },
    {
      label: 'Autre mob fr',
      statusKey: 'autreMobFrOnglet',
      route: extractRoute(ApiEndpoints.AutreMobFrOnglet.getById(''))
    },
    {
      label: 'Mob internatio',
      statusKey: 'mobInternationaleOnglet',
      route: extractRoute(ApiEndpoints.mobInternationaleOnglet.getById(''))
    },
    {
      label: 'Bâtiments',
      statusKey: 'batimentsOnglet',
      route: extractRoute(ApiEndpoints.BatimentsOnglet.getBatimentImmobilisationMobilier(''))
    },
    {
      label: 'Parkings',
      statusKey: 'parkingsOnglet',
      route: extractRoute(ApiEndpoints.ParkingVoirieOnglet.getById(''))
    },
    {
      label: 'Auto',
      statusKey: 'autoOnglet',
      route: extractRoute(ApiEndpoints.AutoOnglet.getById(''))
    },
    {
      label: 'Numérique',
      statusKey: 'numeriqueOnglet',
      route: extractRoute(ApiEndpoints.NumeriqueOnglet.getById(''))
    },
    {
      label: 'Autres immob',
      statusKey: 'autreImmobilisationOnglet',
      route: extractRoute(ApiEndpoints.autreImmobilisationOnglet.getById(''))
    },
    {
      label: 'Achats',
      statusKey: 'achatOnglet',
      route: extractRoute(ApiEndpoints.AchatsOnglet.getById(''))
    },
    {
      label: 'Déchets',
      statusKey: 'dechetsOnglet',
      route: extractRoute(ApiEndpoints.DechetsOnglet.getById(''))
    }
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
  statuses: Record<string, boolean> = {};

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
    this.years = Array.from({ length: this.currentYear - 2018 }, (_, i) => {
      const end = this.currentYear - i;
      const start = end - 1;
      return { label: `${start}-${end}`, value: end };
    });

    this.selectedYear = this.yearService.getSelectedYear();

    this.statusService.statuses$.subscribe((s: Record<string, boolean>) => {
      this.statuses = s;
    });

    this.loadOngletIds();
    this.loadOngletStatuses();
  }

  getStatus(key: string): boolean {
    return this.statuses[key] ?? false;
  }

  goToSaisie(onglet: { statusKey: string; route: string }): void {
    const id = this.ongletIdMap[onglet.statusKey];
    if (id) {
      this.router.navigate([`/${onglet.route}/${id}`]);
    } else {
      console.error('ID onglet introuvable pour', onglet.statusKey, 'année', this.selectedYear);
    }
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



  goToEnergie(): void {
    const ongletId = this.ongletIdMap['energieOnglet'];
    if (ongletId) {
      this.router.navigate([`/energieOnglet/${ongletId}`]);
    } else {
      console.error('ID onglet énergie introuvable pour l\'année', this.selectedYear);
    }
  }

  onYearChange(newYear: number): void {
    this.selectedYear = newYear;
    this.yearService.setSelectedYear(newYear);
    this.loadOngletIds();
    this.loadOngletStatuses();
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

  loadOngletStatuses(): void {
    this.ongletService.getOngletStatuses(this.entiteId, this.selectedYear)?.subscribe({
      next: (result) => {
        this.statusService.setStatuses(result);
      },
      error: (err) => {
        console.error('Erreur récupération statut onglets:', err);
      }
    });
  }
}
