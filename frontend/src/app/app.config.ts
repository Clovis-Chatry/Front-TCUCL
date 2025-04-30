import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

// import { routes } from './app.routes';

import {EnergieSaisieDonneesPageComponent} from './components/saisie-donnees-page/energie/energie-saisie-donnees-page.component';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {HeaderSaisieDonneesComponent} from './components/header-saisie-donnees/header-saisie-donnees.component';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter([
    { path: 'login', component: LoginPageComponent },
    { path: 'header-saisie', component: HeaderSaisieDonneesComponent },

    { path: 'saisie-donnees/:id', component: EnergieSaisieDonneesPageComponent },

    { path: '', redirectTo: '/login', pathMatch: 'full' }
  ])]
};
