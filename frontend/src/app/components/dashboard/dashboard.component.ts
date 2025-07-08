import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OngletStatusService } from '../../services/onglet-status.service';
import { OngletService } from '../header-saisie-donnees/onglet.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CommonModule, FormsModule]
})

export class DashboardComponent implements OnInit, OnDestroy {
  currentYear: number = new Date().getFullYear();
  ongletIdMap: { [key: string]: number } = {};
  entiteId!: number;
  statuses: Record<string, boolean> = {};
  private statusSub?: Subscription;

    onglets = [
      { label: 'Energie', path: 'energieOnglet' },
      { label: 'Emissions fugitives', path: 'emissionFugitiveOnglet' },
      { label: 'Mobilité dom-trav', path: 'mobiliteDomicileTravailOnglet' },
      { label: 'Autre mob fr', path: 'autreMobFrOnglet' },
      { label: 'Mob internatio', path: 'mobInternationalOnglet' },
      { label: 'Bâtiments', path: 'batimentImmobilisationMobilierOnglet' },
      { label: 'Parkings', path: 'parkingVoirieOnglet' },
      { label: 'Auto', path: 'vehiculeOnglet' },
      { label: 'Numérique', path: 'numeriqueOnglet' },
      { label: 'Autres immob', path: 'autreImmobilisationOnglet' },
      { label: 'Achats', path: 'achatOnglet' },
      { label: 'Déchets', path: 'dechetOnglet' }
    ];

  constructor(
    private router: Router,
    protected statusService: OngletStatusService,
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
    this.loadOngletStatuses();
    this.statusSub = this.statusService.statuses$.subscribe(s => {
      this.statuses = s;
    });
  }

  ngOnDestroy(): void {
    this.statusSub?.unsubscribe();
  }

  onYearChange(newYear: number): void {
    this.currentYear = newYear;
    this.loadOngletIds();
    this.loadOngletStatuses();
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

  loadOngletStatuses(): void {
    this.ongletService.getOngletStatuses(this.entiteId, this.currentYear)?.subscribe({
      next: (statuses) => {
        this.statusService.setStatuses(statuses);
      },
      error: (err) => {
        console.error('Erreur récupération statuses:', err);
      }
    });
  }

  getStatus(path: string): boolean {
    return this.statuses[path] ?? false;
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
}
