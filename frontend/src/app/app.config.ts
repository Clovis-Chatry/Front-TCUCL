import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

// import { routes } from './app.routes';
import {SaisieDonneesPageComponent} from './saisie-donnees-page/saisie-donnees-page.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {HeaderSaisieDonneesComponent} from './header_saisie_donnees/header-saisie-donnees.component';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter([
    { path: 'login', component: LoginPageComponent },
    { path: 'header-saisie', component: HeaderSaisieDonneesComponent },
    { path: 'saisie-donnees', component: SaisieDonneesPageComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
  ])]
};
