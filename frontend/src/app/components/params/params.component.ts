import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  isParams: boolean;
  isAdmin?: boolean; // bien écrit avec A majuscule
}

interface Entity {
  name: string;
  type: string;
  params: User;
  admin: User; // AJOUTÉ pour corriger le HTML
}

@Component({
  selector: 'app-params',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.scss']
})
export class ParamsComponent {
  constructor(private router: Router) {}

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

  updateInfo(): void {
    console.log('Infos mises à jour :', this.user);
  }

  sendPasswordReset(): void {
    console.log('Réinitialisation demandée pour :', this.user.email);
  }

  createEntity(): void {
    this.entities.push({ ...this.entity });
    console.log('Nouvelle entité :', this.entity);

    this.entity = {
      name: '',
      type: '',
      params: { firstName: '', lastName: '', email: '', isParams: true },
      admin: { firstName: '', lastName: '', email: '', isParams: false, isAdmin: false }
    };
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
