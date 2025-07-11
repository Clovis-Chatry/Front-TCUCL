import { Component, HostListener, Input, inject, signal, effect } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf, NgOptimizedImage } from '@angular/common';
import {UserService} from '../../services/user.service';
import {MatIconModule} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgOptimizedImage, NgIf, MatIconModule, MatButton],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() PageTitle: string | undefined;
  @Input() LogoSrc: string | undefined;

  private router = inject(Router);
  private authService = inject(AuthService);
  private currentUser = inject(UserService);

  nom = this.currentUser.nom;
  prenom = this.currentUser.prenom;
  entite = this.currentUser.entite;
  entiteId = this.currentUser.entiteId;
  isLoggedIn = this.currentUser.isLoggedIn;

  dropdownOpen = false;

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
