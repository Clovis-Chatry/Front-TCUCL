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
  DechetSaisieDonneesPageComponent
} from './components/saisie-donnees-page/dechets/dechets-saisie-donnees-page.component';
import {
  AchatsSaisieDonneesPageComponent
} from './components/saisie-donnees-page/achats/achats-saisie-donnees-page.component';
import {
  AutreImmobilisationPageComponent
} from './components/saisie-donnees-page/autre-immob/immob-donnees-page.component';
import {
  NumeriqueSaisieDonneesPageComponent
} from './components/saisie-donnees-page/numerique/numerique-saisie-donnees-page.component';
import {AutoSaisieDonneesPageComponent} from './components/saisie-donnees-page/auto/auto-saisie-donnees-page.component';
import {ParkSaisieDonneesPageComponent} from './components/saisie-donnees-page/park/park-saisie-donnees-page.component';
import {
  MobiliteInternationaleSaisieDonneesPageComponent
} from './components/saisie-donnees-page/mob-inter/mob-inter-saisie-donnees-page.component';
import {
  BatimentsSaisieDonneesPageComponent
} from './components/saisie-donnees-page/batiments/bat-saisie-donnees-page.component';
import {TrajectoireComponent} from './components/affichage-graphiques/suivi/trajectoire-page.component';

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
    data: { showSaisieHeader: true },
    canActivate: [authGuard],
  },
  {
    path: 'emissionFugitiveOnglet/:id',
    component: EmissFugiSaisieDonneesPageComponent,
    data: { showSaisieHeader: true },
    canActivate: [authGuard]
  },
  {
    path: 'dechetOnglet/:id',
    component: DechetSaisieDonneesPageComponent,
    data: {showSaisieHeader: true},
    canActivate: [authGuard],
  },
  {
    path: 'mobiliteDomicileTravailOnglet/:id',
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
    path: 'achatOnglet/:id',
    component: AchatsSaisieDonneesPageComponent,
    data: { showSaisieHeader: true },
    canActivate: [authGuard]
  },
  {
    path: 'autreImmobilisationOnglet/:id',
    component: AutreImmobilisationPageComponent,
    data: { showSaisieHeader: true },
    canActivate: [authGuard]
  },
  {
    path: 'numeriqueOnglet/:id',
    component: NumeriqueSaisieDonneesPageComponent,
    data: { showSaisieHeader: true },
    canActivate: [authGuard]
  },
  {
    path: 'vehiculeOnglet/:id',
    component: AutoSaisieDonneesPageComponent,
    data: { showSaisieHeader: true },
    canActivate: [authGuard]
  },
  {
    path: 'parkingVoirieOnglet/:id',
    component: ParkSaisieDonneesPageComponent,
    data: { showSaisieHeader: true },
    canActivate: [authGuard]
  },
  {
    path: 'mobInternationalOnglet/:id',
    data: { showSaisieHeader: true },
    component: MobiliteInternationaleSaisieDonneesPageComponent,
    canActivate: [authGuard]
  },
  {
    path: 'batimentImmobilisationMobilierOnglet/:id',
    data: { showSaisieHeader: true },
    component: BatimentsSaisieDonneesPageComponent,
    canActivate: [authGuard]
  },
  {
    path: 'trajectoire',
    component: TrajectoireComponent,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

export const AppRouter = provideRouter(routes);
