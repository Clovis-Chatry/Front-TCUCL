import {Component} from '@angular/core';
import {HeaderComponent} from './components/header/header.component';

import {RouterOutlet} from '@angular/router';
import {ActivatedRoute, NavigationEnd, Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {HeaderSaisieDonneesComponent} from './components/header-saisie-donnees/header-saisie-donnees.component';
import {filter, map, mergeMap} from 'rxjs';

@Component({
  selector: 'app-root',

  imports: [CommonModule, RouterOutlet, HeaderComponent, RouterModule, HeaderSaisieDonneesComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  showSaisieHeader = false;
  title = 'frontend';
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map(route => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        mergeMap(route => route.data)
      )
      .subscribe(data => {
        this.showSaisieHeader = !!data['showSaisieHeader'];
      });
  }
}
