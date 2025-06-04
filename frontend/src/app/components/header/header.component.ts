import { Component, HostListener, Input, inject, signal, effect } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgOptimizedImage, NgIf],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() PageTitle: string | undefined;
  @Input() LogoSrc: string | undefined;

  private router = inject(Router);
  private authService = inject(AuthService);

  nom = signal('');
  prenom = signal('');
  entite = signal('');
  entiteId = signal('');

  dropdownOpen = false;
  isLoggedIn = this.authService.isAuthenticated; // signal directement

  constructor() {
    effect(() => {
      const user = this.authService.getUserInfo()();

      if (user) {
        this.nom.set(user.nom ?? '');
        this.prenom.set(user.prenom ?? '');
        this.entite.set(user.entiteNom ?? '');
        this.entiteId.set(user.entiteID ?? 0);
      }
    });
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  goToProfile(): void {
    this.dropdownOpen = false;
    this.router.navigate(['/params']);
  }

  logout(): void {
    this.authService.logout();
    this.dropdownOpen = false;
    this.router.navigate(['/login']);
  }

  @HostListener('document:click', ['$event'])
  closeDropdownOutside(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-wrapper')) {
      this.dropdownOpen = false;
    }
  }

  goToParams() {
    this.router.navigate(['/params']);
  }
}
