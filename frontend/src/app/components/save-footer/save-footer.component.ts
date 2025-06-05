import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OngletStatusService } from '../../services/onglet-status.service';

@Component({
  selector: 'app-save-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './save-footer.component.html',
  styleUrls: ['./save-footer.component.scss']
})
export class SaveFooterComponent implements OnInit {
  @Input() path = '';
  loading = false;
  estTermine = false;

  constructor(private statusService: OngletStatusService) {}

  ngOnInit(): void {
    if (this.path) {
      this.estTermine = this.statusService.getStatus(this.path);
    }
  }

  save(): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  toggleTermine(): void {
    this.estTermine = !this.estTermine;
    if (this.path) {
      this.statusService.setStatus(this.path, this.estTermine);
    }
  }
}
