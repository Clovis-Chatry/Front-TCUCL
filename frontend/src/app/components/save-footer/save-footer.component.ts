import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-save-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './save-footer.component.html',
  styleUrls: ['./save-footer.component.scss']
})
export class SaveFooterComponent {
  loading = false;

  save(): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }
}
