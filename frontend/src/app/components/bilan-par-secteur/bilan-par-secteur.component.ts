import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bilan-par-secteur',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bilan-wrapper">
      <h2 class="table-title">BILAN PAR SECTEUR</h2>
      <table class="indicator-table">
        <thead>
          <tr>
            <th></th>
            <th>Au global en Tonnes CO2e</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let s of sectors">
            <td>{{ s.label }}</td>
            <td>{{ s.value | number:'1.0-4' }}</td>
          </tr>
          <tr class="total">
            <td>Bilan carbone total</td>
            <td>{{ total | number:'1.0-4' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styleUrls: ['./bilan-par-secteur.component.scss']
})
export class BilanParSecteurComponent {
  @Input() sectors: { label: string; value: number }[] = [];
  @Input() total: number = 0;
}