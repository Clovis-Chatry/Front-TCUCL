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
    {
      label: 'Energie',
      statusKey: 'energieOnglet',
      route: 'energieOnglet'
    },
    {
      label: 'Emissions fugitives',
      statusKey: 'emissionFugitiveOnglet',
      route: 'emissionFugitiveOnglet'
    },
    {
      label: 'Mobilité dom-trav',
      statusKey: 'mobiliteDomicileTravailOnglet',
      route: 'mobiliteDomicileTravailOnglet'
    },
    {
      label: 'Autre mob fr',
      statusKey: 'autreMobFrOnglet',
      route: 'autreMobFrOnglet'
    },
    {
      label: 'Mob internatio',
      statusKey: 'mobInternationalOnglet',
      route: 'mobInternationalOnglet'
    },
    {
      label: 'Bâtiments',
      statusKey: 'batimentImmobilisationMobilierOnglet',
      route: 'batimentImmobilisationMobilierOnglet'
    },
    {
      label: 'Parkings',
      statusKey: 'parkingVoirieOnglet',
      route: 'parkingVoirieOnglet'
    },
    {
      label: 'Auto',
      statusKey: 'vehiculeOnglet',
      route: 'vehiculeOnglet'
    },
    {
      label: 'Numérique',
      statusKey: 'numeriqueOnglet',
      route: 'numeriqueOnglet'
    },
    {
      label: 'Autres immob',
      statusKey: 'autreImmobilisationOnglet',
      route: 'autreImmobilisationOnglet'
    },
    {
      label: 'Achats',
      statusKey: 'achatOnglet',
      route: 'achatOnglet'
    },
    {
      label: 'Déchets',
      statusKey: 'dechetOnglet',
      route: 'dechetOnglet'
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



  goToEnergie() {
    this.router.navigate([`/energieOnglet/7`]);
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
