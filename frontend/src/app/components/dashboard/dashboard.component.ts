import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [
    FormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(private router: Router) {
  }

  goToSaisieDonnees() {
    let id = 2;
    this.router.navigate([`/energieOnglet/${id}`]);
  }
}
