import { Component, Input, HostListener } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

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

  isLoggedIn = true;

  dropdownOpen = false;

  constructor(private router: Router) {}

  toggleDropdown(): void {
    console.log("connecté")
    this.dropdownOpen = !this.dropdownOpen;
  }

  goToProfile(): void {
    this.dropdownOpen = false;
    this.router.navigate(['/admin']);
  }

  logout(): void {
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
}
