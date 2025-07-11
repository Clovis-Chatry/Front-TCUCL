import { provideRouter, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/authguard';
import { ParamsComponent } from './components/params/params.component';
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
import { AutoSaisieDonneesPageComponent } from './components/saisie-donnees-page/auto/auto-saisie-donnees-page.component';
import { ParkSaisieDonneesPageComponent } from './components/saisie-donnees-page/park/park-saisie-donnees-page.component';
import {
  MobiliteInternationaleSaisieDonneesPageComponent
} from './components/saisie-donnees-page/mob-inter/mob-inter-saisie-donnees-page.component';
import {
  BatimentsSaisieDonneesPageComponent
} from './components/saisie-donnees-page/batiments/bat-saisie-donnees-page.component';
import { TrajectoireComponent } from './components/affichage-graphiques/suivi/trajectoire-page.component';

import { ONGLET_KEYS } from './constants/onglet-keys';
import {
  GeneralSaisieDonneesPageComponent
} from './components/saisie-donnees-page/general/general-saisie-donnees-page.component';
import { SyntheseEgesComponent } from './components/affichage-graphiques/synthese/synthese-eges-page.component';

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
    path: `${ONGLET_KEYS.General}/:id`,
    component: GeneralSaisieDonneesPageComponent,
    data: { showSaisieHeader: true },
    canActivate: [authGuard],
  },
  {
    path: `${ONGLET_KEYS.Energie}/:id`,
    component: EnergieSaisieDonneesPageComponent,
    data: { showSaisieHeader: true },
    canActivate: [authGuard],
  },
  {
    path: `${ONGLET_KEYS.EmissionsFugitives}/:id`,
    component: EmissFugiSaisieDonneesPageComponent,
    data: { showSaisieHeader: true },
    canActivate: [authGuard]
  },
  {
    path: `${ONGLET_KEYS.Dechets}/:id`,
    component: DechetSaisieDonneesPageComponent,
    data: { showSaisieHeader: true },
    canActivate: [authGuard],
  },
  {
    path: `${ONGLET_KEYS.MobiliteDomTrav}/:id`,
    component: DomTravSaisieDonneesPageComponent,
    data: { showSaisieHeader: true },
    canActivate: [authGuard],
  },
  {
    path: `${ONGLET_KEYS.AutreMobFr}/:id`,
    component: AutreMobSaisieDonneesPageComponent,
    data: { showSaisieHeader: true },
    canActivate: [authGuard],
  },
  {
    path: `${ONGLET_KEYS.Achats}/:id`,
    component: AchatsSaisieDonneesPageComponent,
    data: { showSaisieHeader: true },
    canActivate: [authGuard]
  },
  {
    path: `${ONGLET_KEYS.AutreImmob}/:id`,
    component: AutreImmobilisationPageComponent,
    data: { showSaisieHeader: true },
    canActivate: [authGuard]
  },
  {
    path: `${ONGLET_KEYS.Numerique}/:id`,
    component: NumeriqueSaisieDonneesPageComponent,
    data: { showSaisieHeader: true },
    canActivate: [authGuard]
  },
  {
    path: `${ONGLET_KEYS.Auto}/:id`,
    component: AutoSaisieDonneesPageComponent,
    data: { showSaisieHeader: true },
    canActivate: [authGuard]
  },
  {
    path: `${ONGLET_KEYS.Parkings}/:id`,
    component: ParkSaisieDonneesPageComponent,
    data: { showSaisieHeader: true },
    canActivate: [authGuard]
  },
  {
    path: `${ONGLET_KEYS.MobInternationale}/:id`,
    data: { showSaisieHeader: true },
    component: MobiliteInternationaleSaisieDonneesPageComponent,
    canActivate: [authGuard]
  },
  {
    path: `${ONGLET_KEYS.Batiments}/:id`,
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
    path: 'synthese-eges',
    component: SyntheseEgesComponent,
    canActivate: [authGuard]
  },
  {
    path: 'synthese-eges',
    component: SyntheseEgesComponent,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

export const AppRouter = provideRouter(routes);
