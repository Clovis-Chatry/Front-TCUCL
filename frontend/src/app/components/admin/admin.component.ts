import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
}

interface Entity {
  name: string;
  type: string;
  admin: User;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    isAdmin: false
  };

  entity: Entity = {
    name: '',
    type: '',
    admin: { firstName: '', lastName: '', email: '', isAdmin: true }
  };

  newUser: User = {
    firstName: '',
    lastName: '',
    email: '',
    isAdmin: false
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
      admin: { firstName: '', lastName: '', email: '', isAdmin: true }
    };
  }

  addUser(): void {
    if (this.newUserEntity) {
      this.users.push({ entity: this.newUserEntity, user: { ...this.newUser } });
      console.log('Utilisateur ajouté à', this.newUserEntity, ':', this.newUser);
      this.newUser = { firstName: '', lastName: '', email: '', isAdmin: false };
    }
  }

  filteredUsers(): User[] {
    return this.users.filter(u => u.entity === this.selectedEntity).map(u => u.user);
  }
}
