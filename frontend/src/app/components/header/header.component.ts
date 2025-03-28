import {Component, HostListener, inject, Input} from '@angular/core';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgOptimizedImage, NgIf],
  templateUrl: '././header.component.html',
  styleUrl: '././header.component.scss'

})
export class HeaderComponent {
  @Input() PageTitle: string | undefined;
  @Input() LogoSrc: string | undefined;

  protected name: string | undefined;
  protected surname: string | undefined;
  private entity: number | undefined;

  private readonly authService = inject(AuthService);

  dropdownOpen = false;
  isLoggedIn = this.authService.isLoggedIn();

  constructor(private router: Router) {
    const user = this.authService.getUser();
    if (user) {
      this.name = user.name;
      this.surname = user.surname;
      this.entity = user.entity_id;
    }
  }

  toggleDropdown(): void {
    console.log("connecté")
    this.dropdownOpen = !this.dropdownOpen;
  }

  goToProfile(): void {
    this.dropdownOpen = false;
    this.router.navigate(['/admin']);
  }

  logout(): void {
    this.authService.logout()
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

  goToAdmin() {
    this.router.navigate([`/admin`]);
  }
}
