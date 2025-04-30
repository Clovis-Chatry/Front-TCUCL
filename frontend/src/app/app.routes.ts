import {provideRouter, Routes} from '@angular/router';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {authGuard} from './guards/authguard';
import {ParamsComponent} from './components/params/params.component';
import {
  DomTravSaisieDonneesPageComponent
} from './components/saisie-donnees-page/dom-trav/dom-trav-saisie-donnees-page.component';
import {
  AutreMobSaisieDonneesPageComponent
} from './components/saisie-donnees-page/autre-mob/autre-mob-saisie-donnees-page.component';
import {
  EnergieSaisieDonneesPageComponent
} from './components/saisie-donnees-page/energie/energie-saisie-donnees-page.component';
import {
  EmissFugiSaisieDonneesPageComponent
} from './components/saisie-donnees-page/emiss-fugi/emiss-fugi-saisie-donnees-page.component';
import {
  DechetsSaisieDonneesPageComponent
} from './components/saisie-donnees-page/dechets/dechets-saisie-donnees-page.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },

  {
    path: 'params',
    component: ParamsComponent,
    canActivate: [authGuard]
  },

  {
    path: 'energieOnglet/:id',
    component: EnergieSaisieDonneesPageComponent,
    data: {showSaisieHeader: true},
    canActivate: [authGuard]
  },
  {
    path: 'emissionsFugitivesOnglet/:id',
    component: EmissFugiSaisieDonneesPageComponent,
    data: {showSaisieHeader: true},
    canActivate: [authGuard],
  },
  {
    path: 'dechetsOnglet/:id',
    component: DechetsSaisieDonneesPageComponent,
    data: {showSaisieHeader: true},
    canActivate: [authGuard],
  },
  {
    path: 'mobiliteDomTravOnglet/:id',
    component: DomTravSaisieDonneesPageComponent,
    data: {showSaisieHeader: true},
    canActivate: [authGuard],
  },
  {
    path: 'autreMobFrOnglet/:id',
    component: AutreMobSaisieDonneesPageComponent,
    data: {showSaisieHeader: true},
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

export const AppRouter = provideRouter(routes);
