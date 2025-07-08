import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {DashboardStatusService} from '../../services/dashboard-status.service';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    FormsModule,
    JsonPipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  statuses: any = null;

  constructor(private router: Router, private statusService: DashboardStatusService) {}

  ngOnInit() {
    console.log("Connecté");
    const id = '2';
    this.statusService.getAllStatuses(id).subscribe(data => {
      this.statuses = data;
    });
  }

  goToSaisieDonnees() {
    let id = 2;
    this.router.navigate([`/energieOnglet/${id}`]);
  }
}
