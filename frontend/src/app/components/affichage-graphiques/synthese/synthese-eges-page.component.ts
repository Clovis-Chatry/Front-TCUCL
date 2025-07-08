import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { SyntheseEgesService } from '../../../services/synthese-eges.service';

interface Sector {
  label: string;
  value: number;
}

@Component({
  selector: 'app-synthese-eges',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './synthese-eges-page.component.html',
  styleUrls: ['./synthese-eges-page.component.scss']
})
export class SyntheseEgesComponent implements OnInit {
  sectors: Sector[] = [];
  total: number = 0;
  private currentYear: number = new Date().getFullYear();
  private entiteId?: number;
  consoEnergieFinale?: number;

  constructor(
    private router: Router,
    private auth: AuthService,
    private syntheseService: SyntheseEgesService
  ) {
    const user = this.auth.getUserInfo()();
    if (user?.entiteId || user?.entiteID) {
      this.entiteId = user.entiteId ?? user.entiteID;
    }
  }

  ngOnInit(): void {
    this.loadSectors();
    this.fetchSynthese();
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  goToSuivi() {
    this.router.navigate(['/trajectoire']);
  }

  loadSectors(): void {
    this.sectors = [
      { label: 'Emissions fugitives', value: 0 },
      { label: 'Energie', value: 0 },
      { label: 'Déplacements domicile - travail', value: 0 },
      { label: 'Autres déplacements France', value: 0 },
      { label: 'Déplacements internationaux', value: 0 },
      { label: 'Bâtiments, mobilier et parkings', value: 0 },
      { label: 'Numérique', value: 0 },
      { label: 'Autres immobilisations', value: 0 },
      { label: 'Achats', value: 0 },
      { label: 'Déchets', value: 0 }
    ];
    this.total = this.sectors.reduce((sum, s) => sum + s.value, 0);
  }

  private fetchSynthese(): void {
    if (!this.entiteId) {
      const user = this.auth.getUserInfo()();
      if (user?.entiteId || user?.entiteID) {
        this.entiteId = user.entiteId ?? user.entiteID;
      }
    }
    if (!this.entiteId) return;
    this.syntheseService
      .getSynthese(this.entiteId, this.currentYear)
      ?.subscribe({
        next: res => {
          const sector = this.sectors.find(s => s.label === 'Energie');
          if (sector) sector.value = Number(res.consoEnergieFinale ?? 0);
          this.consoEnergieFinale = res.consoEnergieFinale;
          this.total = this.sectors.reduce((sum, s) => sum + s.value, 0);
        },
        error: err => console.error('Erreur récupération synthèse', err)
      });
  }
}
