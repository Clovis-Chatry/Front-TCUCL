import {Component, HostListener, inject, Input} from '@angular/core';
import {Router} from '@angular/router';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {UserService} from '../../services/user.service';

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
    this.currentUser.isLoggedIn.set(false); // facultatif selon implémentation
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
