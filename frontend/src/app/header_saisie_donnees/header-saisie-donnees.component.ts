import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router} from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header-saisie-donnees',
  imports: [CommonModule, FormsModule],
  templateUrl: './header-saisie-donnees.component.html',
  styleUrls: ['./header-saisie-donnees.component.scss']
})
export class HeaderSaisieDonneesComponent {
  constructor(private router: Router) {}
  @Input() PageTitle: string = '';
  @Input() LogoSrc: string = '';
  tabs = ['Energie', 'Emissions fugitives', 'Mobilité dom-trav', 'Autre mob FR', 'Mob internationale', 'Bâtiments',
    'Parkings', 'Auto', 'Numérique', 'Autre immob', 'Achats', 'Déchets'];
  startIndex = 0;
  visibleCount = 8;

  activeTab: string | null = null;  // Variable pour suivre l'onglet actif
  currentYear: number = new Date().getFullYear();
  selectedYear: number = this.currentYear;
  years: number[] = Array.from({ length: 7 }, (_, i) => 2025 - i);

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
    this.activeTab = tab;  // Définir l'onglet actif lorsque cliqué
    console.log(`Navigation vers ${tab}`);
    // Ici, tu peux utiliser un routeur Angular pour naviguer, ex :
    // this.router.navigate([`/${tab.toLowerCase()}`]);
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  getTabClass(tab: string) {
    return this.activeTab === tab ? 'tab active' : 'tab'; // Ajouter la classe active au bouton sélectionné
  }
}
