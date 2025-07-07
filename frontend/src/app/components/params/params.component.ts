import {Component, inject, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {ParamService} from './params.service';
import {AuthService} from '../../services/auth.service';
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

export interface EntityNomId {
  id: number;
  nom: string;
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
  @ViewChild('form') form!: NgForm;

  user: User = {
    email: '',
    lastName: '',
    firstName: '',
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

  userToAdd: { estAdmin: boolean; entityName: string; prenom: string; nom: string; email: string } = {
    entityName: '',
    prenom: '',
    nom: '',
    email: '',
    estAdmin: false
  };

  newUserEntity: string = '';
  selectedEntity: string = '';

  entities: Entity[] = [];
  entitiesList: EntityNomId[] = [];
  users: { entity: string; user: User }[] = [];

  ngOnInit(): void {
    this.loadUtilisateursParEntite(this.userService.entiteId());
    this.loadEntitiesIfSuperAdmin();
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
          params: {firstName: '', lastName: '', email: '', isParams: true},
          admin: {...this.entityToCreate.admin}
        });
        this.form.resetForm();
      },
      error: (err) => console.error('Erreur HTTP :', err)
    });
  }

  addUser(): void {
    const headers = this.getAuthHeaders();
    const entiteId = this.userService.entiteId();
    const body = {
      prenom: this.userToAdd.prenom,
      nom: this.userToAdd.nom,
      email: this.userToAdd.email,
      estAdmin: this.userToAdd.estAdmin
    };

    this.paramService.creerutilisateur(entiteId, body, headers)
      .subscribe({
        next: () => {
          alert('Utilisateur créé avec succès');
          this.form.resetForm();
          this.loadEntitiesIfSuperAdmin();
        },
        error: (err) => {
          console.error('Erreur lors de la création', err);
          this.form.resetForm();
        }
      });
  }

  loadUtilisateursParEntite(entiteId: number): void {
    const headers = this.getAuthHeaders();

    this.paramService.getUtilisateurParEntiteId(entiteId, headers).subscribe({
      next: (users: UtilisateurDto[]) => {
        this.utilisateursEntiteSelectionnee = users;
        console.log('Utilisateurs chargés :', users);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des utilisateurs :', err);
      }
    });
  }

  loadEntitiesIfSuperAdmin(): void {
    const headers = this.getAuthHeaders();
    this.paramService.getAllEntiteNomId(headers).subscribe({
      next: (entites: { id: number, nom: string }[]) => {
        this.entitiesList = entites;
        console.log('Entités chargées :', this.entitiesList);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des entités :', err);
      }
    });

  }

  onEntityChange(entiteId: number): void {
    if (entiteId) {
      this.loadUtilisateursParEntite(entiteId);
    }
  }

  // Permet de gérer le check du rôle Admin dans la liste des utilisateurs
  onToggleAdmin(utilisateur: UtilisateurDto): void {
    const headers = this.getAuthHeaders();
    const entiteId = this.userService.entiteId();

    // Nouvelle valeur à envoyer
    const nouvelleValeur = !utilisateur.estAdmin;

    this.paramService.modifierEstAdmin(utilisateur.id, nouvelleValeur, headers)
      .subscribe({
        next: () => {
          utilisateur.estAdmin = nouvelleValeur; // mise à jour locale après succès
        },
        error: (err) => {
          alert('Erreur lors de la mise à jour du rôle administrateur.');
        }
      });
  }

  goBackToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
