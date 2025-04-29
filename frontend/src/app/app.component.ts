import {Component} from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {HeaderSaisieDonneesComponent} from './header-saisie-donnees/header-saisie-donnees.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, HeaderComponent, RouterModule, HeaderSaisieDonneesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
  constructor(private router: Router) {}
  isSaisiePage(): boolean {
    return this.router.url.includes('energieOnglet'); // Remplace par ton path de saisie des données
  }
}
