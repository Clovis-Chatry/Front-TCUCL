import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ParamService } from './params.service';
import { AuthService } from '../../services/auth.service';
import { UtilisateurDto } from '../../models/user.model';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon'; // adapte le chemin selon ton arborescence

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
  imports: [CommonModule, FormsModule, MatIcon, MatButton],
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
  idUtilisateurConnecte = this.userService.id;
  utilisateursEntiteSelectionnee: UtilisateurDto[] = [];
  @ViewChild('form') form!: NgForm;

  user: User = {
    email: '',
    lastName: '',
    firstName: '',
    isParams: false
  };

  changePasswordData = {
    email: '',
    ancienMdp: '',
    nouveauMdp: ''
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

  selectedEntity: string = '';

  entities: Entity[] = [];
  entitiesList: EntityNomId[] = [];

  ngOnInit(): void {
    this.loadUtilisateursParEntite(this.userService.entiteId());
    if (this.isSuperAdmin()) { this.loadEntitiesIfSuperAdmin(); }
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
      next: () => {
        alert("Informations mises à jour avec succès. Vous allez être redirigé vers la page de connexion.");
        this.authService.logout(); // Déconnexion manuelle
        this.router.navigate(['/login']); // Redirection
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour :', err);
        alert('Une erreur est survenue lors de la mise à jour des informations.');
      }
    });
  }

  changePassword(): void {
    const headers = this.getAuthHeaders();

    this.paramService.changePassword(this.changePasswordData, headers).subscribe({
      next: () => {
        alert('Mot de passe changé avec succès. Vous allez être redirigé vers la page de connexion.');
        this.changePasswordData = { email: '', ancienMdp: '', nouveauMdp: '' };
        this.authService.logout(); // Optionnel si tu veux déconnecter l'utilisateur
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erreur lors du changement de mot de passe :', err);
        alert('Erreur lors du changement de mot de passe.');
      }
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
        this.form.resetForm();
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
        alert('Entité créée avec succès !');
        this.loadEntitiesIfSuperAdmin();
      },
      error: (err) => {
        console.error('Erreur HTTP :', err);
        this.form.resetForm();
      }
    });
  }

  addUser(): void {
    const headers = this.getAuthHeaders();
    // Choix de l'entité selon le rôle
    const entiteId = this.isSuperAdmin() ? this.selectedEntity : this.userService.entiteId();
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
          this.userToAdd = {
            entityName: '',
            prenom: '',
            nom: '',
            email: '',
            estAdmin: false
          };
          this.loadUtilisateursParEntite(entiteId);
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
        this.utilisateursEntiteSelectionnee = users.filter(
          u => u.id !== this.idUtilisateurConnecte()
        );
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

  deleterUser(utilisateurId: number): void {
    const entiteId = this.isSuperAdmin() ? this.selectedEntity : this.userService.entiteId();
    const headers = this.getAuthHeaders();

    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.paramService.deleterUser(utilisateurId, headers).subscribe({
        next: () => {
          alert('Utilisateur supprimé avec succès');
          this.utilisateursEntiteSelectionnee = this.utilisateursEntiteSelectionnee.filter(u => u.id !== utilisateurId);
          this.loadUtilisateursParEntite(entiteId);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression de l’utilisateur :', err);
        }
      });
    }
  }

  goBackToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  selectedFile: File | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  importFile(): void {
    if (!this.selectedFile) {
      alert("Aucun fichier sélectionné.");
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    const headers = {
      'Authorization': `Bearer ${this.authService.getToken()}`
      // ⚠️ Ne PAS mettre Content-Type ici ! Angular s'en charge pour FormData.
    };

    this.paramService.importerFichier(formData, headers).subscribe({
      next: () => {
        alert('Fichier importé avec succès.');
        this.selectedFile = null;
      },
      error: (err) => {
        console.error('Erreur lors de l\'import du fichier :', err);
        alert('Erreur lors de l\'import.');
      }
    });
  }
}
