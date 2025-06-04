import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header-saisie-donnees',
  imports: [CommonModule, FormsModule],
  templateUrl: './header-saisie-donnees.component.html',
  styleUrls: ['./header-saisie-donnees.component.scss']
})
export class HeaderSaisieDonneesComponent {
  constructor(private router: Router) {
    this.currentYear = new Date().getFullYear();
    this.years = Array.from({ length: this.currentYear - 2018 }, (_, i) => this.currentYear - i);
    this.selectedYear = this.currentYear;
  }

  @Input() PageTitle: string = '';
  @Input() LogoSrc: string = '';

  tabs = ['Energie', 'Emissions fugitives', 'Mobilite dom-trav', 'Autre mob FR', 'Mob internationale', 'Batiments',
    'Parkings', 'Auto', 'Numerique', 'Autre immob', 'Achats', 'Dechets'];
  startIndex = 0;
  visibleCount = 8;

  activeTab: string | null = null;
  currentYear: number;
  selectedYear: number;
  years: number[] = [];

  visibleTabs() {
    return this.tabs.slice(this.startIndex, this.startIndex + this.visibleCount);
  }

  scrollLeft() {
    if (this.startIndex > 0) {
      this.startIndex--;
    }
  }

  scrollRight() {
    if (this.startIndex + this.visibleCount < this.tabs.length) {
      this.startIndex++;
    }
  }

  navigateTo(tab: string) {
    this.activeTab = tab;

    const urlPart = this.tabToRoute[tab];

    if (!urlPart) {
      console.error('Tab non reconnu:', tab);
      return;
    }

    const year = Number(this.selectedYear);
    const index = this.years.indexOf(year);


    if (index === -1) {
      console.error('Année selectionnée invalide:', this.selectedYear);
      return;
    }

    const id = index.toString();
    this.router.navigate([`/${urlPart}/${id}`]);
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  getTabClass(tab: string) {
    return this.activeTab === tab ? 'tab active' : 'tab';
  }

  private tabToRoute: { [key: string]: string } = {
    'Energie': 'energieOnglet',
    'Emissions fugitives': 'emissionsFugitivesOnglet',
    'Mobilite dom-trav': 'mobiliteDomTravOnglet',
    'Autre mob FR': 'autreMobFrOnglet',
    'Mob internationale': 'mobiliteInternationaleOnglet',
    'Batiments': 'batimentsOnglet',
    'Parkings': 'parkOnglet',
    'Auto': 'autoOnglet',
    'Numerique': 'numeriqueOnglet',
    'Autre immob': 'immobOnglet',
    'Achats': 'achatsOnglet',
    'Dechets': 'dechetsOnglet'
  };
}
