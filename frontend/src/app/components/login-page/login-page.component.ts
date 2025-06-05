import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {FormsModule} from '@angular/forms';
import { NoNegativeDirective } from '../../directives/no-negative.directive';

@Component({
  selector: 'app-login-page',
  imports: [NoNegativeDirective, 
    FormsModule
  ],
  templateUrl: './login-page.component.html' ,
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  email = '';
  password = '';
  loginError = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService.login(this.email, this.password).subscribe(success => {
      if (success) {
        this.router.navigate(['/dashboard']);
      } else {
        this.loginError = true;
      }
    });
  }
}
