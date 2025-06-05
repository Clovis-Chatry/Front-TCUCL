import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {ParamService} from './params.service';
import {AuthService} from '../../services/auth.service'; // adapte le chemin selon ton arborescence

interface User {
  firstName: string;
  lastName: string;
  email: string;
  isParams: boolean;
  isAdmin?: boolean;
}

interface Entity {
  name: string;
  type: string;
  params: User;
  admin: User;
}

@Component({
  selector: 'app-params',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.scss']
})
export class ParamsComponent {
  private router = inject(Router);
  private userService = inject(UserService);
  private paramService = inject(ParamService);
  private authService = inject(AuthService);

  isUser = this.userService.isUser;
  isAdmin = this.userService.isAdmin;
  isSuperAdmin = this.userService.isSuperAdmin;

  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    isParams: false
  };

  entity: Entity = {
    name: '',
    type: '',
    params: { firstName: '', lastName: '', email: '', isParams: true },
    admin: { firstName: '', lastName: '', email: '', isParams: false, isAdmin: false }
  };

  newUserEntity: string = '';
  selectedEntity: string = '';

  entities: Entity[] = [];
  users: { entity: string; user: User }[] = [];

  getAuthHeaders(): { [key: string]: string } {
    const token = this.authService.getToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }

  isEmailValid(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }


  updateInfo(): void {
    const userId = this.userService.rawUser().id;
    const headers = this.getAuthHeaders();
    this.paramService.updateUserInfos(userId, {
      prenom: this.user.firstName,
      nom: this.user.lastName,
      email: this.user.email
    }, headers).subscribe({
      next: () => alert("Mise à jour effectuée."),
      error: (err) => console.error('Erreur lors de la mise à jour :', err)
    });
  }

  sendPasswordReset(): void {
    console.log('Réinitialisation demandée pour :', this.user.email);
  }

  createEntity(): void {
    // Préparation de l'objet selon le format attendu par le backend
    const body = {
      nom: this.entity.name,
      type: this.entity.type,
      nomUtilisateur: this.entity.admin.lastName,
      prenomUtilisateur: this.entity.admin.firstName,
      emailUtilisateur: this.entity.admin.email
    };

    // Récupération des headers avec token JWT
    const headers = this.getAuthHeaders();

    // Envoi via paramService (tu dois avoir une méthode dans paramService qui fait le POST)
    this.paramService.creerEntite(body, headers).subscribe({
      next: (res) => {
        alert('Entité créée avec succès !');
        // Ajout local si tu souhaites l'afficher tout de suite dans ta liste d'entités
        this.entities.push({ ...this.entity });

        // Réinitialiser le formulaire
        this.entity = {
          name: '',
          type: '',
          params: { firstName: '', lastName: '', email: '', isParams: true },
          admin: { firstName: '', lastName: '', email: '', isParams: false, isAdmin: false }
        };
      },
      error: (err) => {
        console.error('Erreur création entité', err);
        alert('Erreur lors de la création de l\'entité');
      }
    });
  }

  addUser(): void {
    if (this.newUserEntity) {
      this.users.push({ entity: this.newUserEntity, user: { ...this.entity.admin } });
      console.log('Utilisateur ajouté à', this.newUserEntity, ':', this.entity.admin);

      this.entity.admin = { firstName: '', lastName: '', email: '', isParams: false, isAdmin: false };
    }
  }

  filteredUsers(): User[] {
    return this.users
      .filter(u => u.entity === this.selectedEntity)
      .map(u => u.user);
  }

  goBackToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
