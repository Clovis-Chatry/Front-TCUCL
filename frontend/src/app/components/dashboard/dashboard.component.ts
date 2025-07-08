import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OngletStatusService } from '../../services/onglet-status.service';
import { OngletService } from '../header-saisie-donnees/onglet.service';
import { AnneeService} from '../../services/annee.service';
import {AuthService} from '../../services/auth.service';
import { ONGLET_KEYS } from '../../constants/onglet-keys';
import { forkJoin } from 'rxjs';

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
    { label: 'Energie', statusKey: ONGLET_KEYS.Energie, route: ONGLET_KEYS.Energie },
    { label: 'Emissions fugitives', statusKey: ONGLET_KEYS.EmissionsFugitives, route: ONGLET_KEYS.EmissionsFugitives },
    { label: 'Mobilité dom-trav', statusKey: ONGLET_KEYS.MobiliteDomTrav, route: ONGLET_KEYS.MobiliteDomTrav },
    { label: 'Autre mob fr', statusKey: ONGLET_KEYS.AutreMobFr, route: ONGLET_KEYS.AutreMobFr },
    { label: 'Mob internatio', statusKey: ONGLET_KEYS.MobInternationale, route: ONGLET_KEYS.MobInternationale },
    { label: 'Bâtiments', statusKey: ONGLET_KEYS.Batiments, route: ONGLET_KEYS.Batiments },
    { label: 'Parkings', statusKey: ONGLET_KEYS.Parkings, route: ONGLET_KEYS.Parkings },
    { label: 'Auto', statusKey: ONGLET_KEYS.Auto, route: ONGLET_KEYS.Auto },
    { label: 'Numérique', statusKey: ONGLET_KEYS.Numerique, route: ONGLET_KEYS.Numerique },
    { label: 'Autres immob', statusKey: ONGLET_KEYS.AutreImmob, route: ONGLET_KEYS.AutreImmob },
    { label: 'Achats', statusKey: ONGLET_KEYS.Achats, route: ONGLET_KEYS.Achats },
    { label: 'Déchets', statusKey: ONGLET_KEYS.Dechets, route: ONGLET_KEYS.Dechets }
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

    this.loadOngletIdsAndStatuses();
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
        const ongletId = this.ongletIdMap[ONGLET_KEYS.Energie];
        if (ongletId) {
          this.router.navigate([`/${ONGLET_KEYS.Energie}/${ongletId}`]);
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
    const ongletId = this.ongletIdMap[ONGLET_KEYS.Energie];
    if (ongletId) {
      this.router.navigate([`/${ONGLET_KEYS.Energie}/${ongletId}`]);
    } else {
      console.error('ID onglet énergie introuvable pour l\'année', this.selectedYear);
    }
  }

  onYearChange(newYear: number): void {
    this.selectedYear = newYear;
    this.yearService.setSelectedYear(newYear);
    this.loadOngletIdsAndStatuses();
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

  loadOngletIdsAndStatuses(): void {
    const ids$ = this.ongletService.getOngletIds(this.entiteId, this.selectedYear);
    const status$ = this.ongletService.getOngletStatuses(this.entiteId, this.selectedYear);
    if (!ids$ || !status$) return;

    forkJoin([ids$, status$]).subscribe({
      next: ([ids, statuses]) => {
        this.ongletIdMap = ids;
        this.statusService.setStatuses(statuses);
      },
      error: (err) => {
        console.error('Erreur récupération onglets:', err);
      }
    });
  }
}
