import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  credentials = {
    username: '',
    password: '',
    rememberMe: false
  };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  login() {
    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage = 'Mot de passe ou nom d\'utilisateur incorrect';
        console.error('Login failed', err);
      }
    });
    }
}
