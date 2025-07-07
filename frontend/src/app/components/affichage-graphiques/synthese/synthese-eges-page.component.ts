import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadSectors();
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
}
