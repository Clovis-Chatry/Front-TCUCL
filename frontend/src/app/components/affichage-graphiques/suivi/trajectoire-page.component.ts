import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';

interface Indicator {
  label: string;
  value2019: string | number;
  value2022: string | number;
  evolution: string;
  section?: boolean;
}

@Component({
  selector: 'app-indicators',
  templateUrl: './trajectoire-page.component.html',
  styleUrls: ['./trajectoire-page.component.scss']
})
export class TrajectoireComponent implements OnInit {
  indicators: Indicator[] = [];
  constructor(private router: Router, private auth: AuthService) {}

    navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }
  ngOnInit(): void {
    this.loadIndicators();
  }

  loadIndicators(): void {
    this.indicators = [
      { label: 'ÉNERGIE ET BÂTIMENTS', value2019: '', value2022: '', evolution: '', section: true },
      { label: 'Consommation d’énergie', value2019: 3600, value2022: 0, evolution: this.getEvolution(3600, 0) },
      { label: '  dont chauffage', value2019: 1500, value2022: 0, evolution: this.getEvolution(1500, 0) },
      { label: '  dont électricité', value2019: 2100, value2022: 0, evolution: this.getEvolution(2100, 0) },
      { label: 'Intensité carbone de l’énergie', value2019: '177.02', value2022: '#DIV/0!', evolution: '#DIV/0!' },

      { label: 'DÉPLACEMENTS DOMICILE TRAVAIL', value2019: '', value2022: '', evolution: '', section: true },
      { label: 'Distance totale réalisée salarié', value2019: '2 694 930', value2022: '-', evolution: this.getEvolution(2694930, 0) },
      { label: 'Part modale voiture', value2019: '#DIV/0!', value2022: '#DIV/0!', evolution: '#DIV/0!' },

      // ... ajoute les autres lignes ici
    ];
  }

  getEvolution(value2019: number, value2022: number): string {
    if (value2019 === 0) return '#DIV/0!';
    const evolution = ((value2022 - value2019) / value2019) * 100;
    const formatted = evolution.toFixed(0);
    return `${formatted}%`;
  }

  isGreen(evolution: string): boolean {
    return evolution.startsWith('-');
  }
}
