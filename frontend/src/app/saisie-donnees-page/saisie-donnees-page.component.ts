import { Component } from '@angular/core';
import { HeaderSaisieDonneesComponent } from '../header_saisie_donnees/header-saisie-donnees.component'; // Importer le composant app-header
import { RouterModule } from '@angular/router';  // Assurer que RouterModule est importé

@Component({
  selector: 'app-saisie-donnees-page',
  standalone: true,
  imports: [RouterModule, HeaderSaisieDonneesComponent],  // Ajouter app-header à imports
  templateUrl: './saisie-donnees-page.component.html',
  styleUrls: ['./saisie-donnees-page.component.scss']
})
export class SaisieDonneesPageComponent {

}
