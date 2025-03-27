import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login-page',
  imports: [],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  constructor(private router: Router) {}
  onLogin() {
    console.log("click sur bouton saisie données")
    // Effectue ici ta logique de vérification du login
    this.router.navigate(['/saisie-donnees']);  // Redirection après connexion réussie
  }
}
