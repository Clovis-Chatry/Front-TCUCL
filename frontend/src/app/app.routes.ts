import {provideRouter, Routes} from '@angular/router';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {authGuard} from './guards/authguard';
import {SaisieDonneesPageComponent} from './saisie-donnees-page/saisie-donnees-page.component';
import { AdminComponent } from './components/admin/admin.component';


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
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard],
   },

  {
    path: 'energieOnglet/:id',
    component: SaisieDonneesPageComponent
  },

  {
    path: '**',
    redirectTo: 'login',
  },
];

export const AppRouter = provideRouter(routes);
