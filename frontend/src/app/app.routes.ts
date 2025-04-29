import {Routes} from '@angular/router';
import {provideRouter} from '@angular/router';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {AuthGuard} from './guards/authguard';
import {EnergieSaisieDonneesPageComponent} from './saisie-donnees-page/energie/energie-saisie-donnees-page.component';
import {DechetsSaisieDonneesPageComponent} from './saisie-donnees-page/dechets/dechets-saisie-donnees-page.component';

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
    canActivate: [AuthGuard],
  },
  { path: 'energieOnglet/:id',
    component: EnergieSaisieDonneesPageComponent
  },  
  { path: 'dechetsOnglet/:id', 
    component: DechetsSaisieDonneesPageComponent 
  },
  {
    path: '**',
    redirectTo: 'login',
  },

];

export const AppRouter = provideRouter(routes);
