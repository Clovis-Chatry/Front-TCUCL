import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OngletStatusService } from '../../services/onglet-status.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-save-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './save-footer.component.html',
  styleUrls: ['./save-footer.component.scss']
})
export class SaveFooterComponent implements OnInit, OnDestroy {
  @Input() path = '';
  @Output() estTermineChange = new EventEmitter<boolean>();
  loading = false;
  estTermine = false;
  private sub?: Subscription;

  constructor(private statusService: OngletStatusService) {}

  ngOnInit(): void {
    if (this.path) {
      this.estTermine = this.statusService.getStatus(this.path);
      this.sub = this.statusService.statuses$.subscribe(statuses => {
        const status = statuses[this.path];
        if (status !== undefined) {
          this.estTermine = status;
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
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
    this.estTermineChange.emit(this.estTermine);
  }
}
