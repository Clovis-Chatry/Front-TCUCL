import {computed, effect, inject, Injectable, signal} from '@angular/core';
import {AuthService} from './auth.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private authService = inject(AuthService);
  rawUser = signal<any>(null);

  nom = computed(() => this.rawUser()?.nom ?? '');
  prenom = computed(() => this.rawUser()?.prenom ?? '');
  email = computed(() => this.rawUser()?.email ?? '');
  entite = computed(() => this.rawUser()?.entiteNom ?? '');
  entiteId = computed(() => this.rawUser()?.entiteId ?? 0);
  id = computed(() => this.rawUser()?.id ?? 0);

  isSuperAdmin = computed(() => !!this.rawUser()?.superAdmin);
  isAdmin = computed(() => !!this.rawUser()?.estAdmin && !this.rawUser()?.superAdmin);
  isUser = computed(() => !this.rawUser()?.estAdmin && !this.rawUser()?.superAdmin);

  role = computed(() => {
    if (this.isSuperAdmin()) return 'superadmin';
    if (this.isAdmin()) return 'admin';
    return 'user';
  });

  constructor() {
    effect(() => {
      const user = this.authService.getUserInfo()();
      this.rawUser.set(user);
    });
  }

  isLoggedIn = this.authService.isAuthenticated;
}
