import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ParamService } from './params.service';
import { AuthService } from '../../services/auth.service';
import {UtilisateurDto} from '../../models/user.model'; // adapte le chemin selon ton arborescence

interface User {
  firstName: string;
  lastName: string;
  email: string;
  isParams: boolean;
  isAdmin?: boolean;
}

interface Entity {
  id: number;
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

  isAdmin = this.userService.isAdmin;
  isSuperAdmin = this.userService.isSuperAdmin;
  utilisateursEntiteSelectionnee: UtilisateurDto[] = [];

  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    isParams: false
  };

  entityToCreate = {
    name: '',
    type: '',
    admin: {
      firstName: '',
      lastName: '',
      email: '',
      isParams: false,
      isAdmin: true
    }
  };

  userToAdd = {
    entityName: '',
    firstName: '',
    lastName: '',
    email: '',
    isAdmin: false
  };

  newUserEntity: string = '';
  selectedEntity: string = '';

  entities: Entity[] = [];
  users: { entity: string; user: User }[] = [];
  selectedEntityId: number | null = null;

  onEntityChange(): void {
    if (this.selectedEntityId !== null) {
      this.loadUtilisateursParEntite(this.selectedEntityId);
    }
  }
  ngOnInit(): void {
    this.selectedEntityId = 2;
    this.loadUtilisateursParEntite(2);
  }


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
    const body = {
      nom: this.entityToCreate.name,
      type: this.entityToCreate.type,
      nomUtilisateur: this.entityToCreate.admin.lastName,
      prenomUtilisateur: this.entityToCreate.admin.firstName,
      emailUtilisateur: this.entityToCreate.admin.email
    };

    const headers = this.getAuthHeaders();

    this.paramService.creerEntite(body, headers).subscribe({
      next: (response) => {
        alert('Entité créée avec succès !');
        this.entities.push({
          id: response.id,
          name: this.entityToCreate.name,
          type: this.entityToCreate.type,
          params: { firstName: '', lastName: '', email: '', isParams: true },
          admin: { ...this.entityToCreate.admin }
        });

        this.entityToCreate = {
          name: '',
          type: '',
          admin: {
            firstName: '',
            lastName: '',
            email: '',
            isParams: false,
            isAdmin: true
          }
        };
      },
      error: (err) => console.error('Erreur HTTP :', err)
    });
  }

  addUser(): void {
    const { entityName, firstName, lastName, email, isAdmin } = this.userToAdd;

    if (entityName && firstName && lastName && email) {
      const newUser: User = {
        firstName,
        lastName,
        email,
        isParams: false,
        isAdmin
      };

      this.users.push({ entity: entityName, user: newUser });

      this.userToAdd = {
        entityName: '',
        firstName: '',
        lastName: '',
        email: '',
        isAdmin: false
      };
    }
  }

  loadUtilisateursParEntite(entiteId: number): void {
    const headers = this.getAuthHeaders();

    this.paramService.getUtilisateurParEntiteId(entiteId, headers).subscribe({
      next: (users :UtilisateurDto[]) => {
        this.utilisateursEntiteSelectionnee = users;
        console.log('Utilisateurs chargés :', users);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des utilisateurs :', err);
      }
    });
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
