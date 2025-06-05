import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ApiEndpoints } from '../../../services/api-endpoints';
import { CommonModule } from '@angular/common';
import { SaveFooterComponent } from '../../save-footer/save-footer.component';
import { OngletStatusService } from '../../../services/onglet-status.service';
import { AchatMapperService } from './achat-mapper.service';

@Component({
  selector: 'app-achats-saisie-donnees-page',
  standalone: true,
  templateUrl: './achats-saisie-donnees-page.component.html',
  styleUrls: ['./achats-saisie-donnees-page.component.scss'],
  imports: [CommonModule, FormsModule, HttpClientModule, SaveFooterComponent]
})
export class AchatsSaisieDonneesPageComponent implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private statusService = inject(OngletStatusService);
  private mapper = inject(AchatMapperService);

  items: any = {};
  estTermine = false;

  onEstTermineChange(value: boolean): void {
    this.estTermine = value;
    this.updateAchat();
  }

  ngOnInit() {
    this.estTermine = this.statusService.getStatus('achatsOnglet');
    this.statusService.statuses$.subscribe(statuses => {
      this.estTermine = statuses['achatsOnglet'] ?? false;
    });
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) this.loadData(id);
    });
  }

  loadData(id: string) {
    const token = this.authService.getToken();
    if (!token) return;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    this.http.get<any>(ApiEndpoints.AchatsOnglet.getById(id), { headers }).subscribe({
      next: data => {
        this.items = this.mapper.fromDto(data);
        this.estTermine = this.items.estTermine ?? false;
      },
      error: err => console.error("Erreur de chargement", err)
    });


  }

  updateAchat(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const token = this.authService.getToken();
    if (!id || !token) return;

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    };

    const payload = this.mapper.toDto({ ...this.items, estTermine: this.estTermine });
    this.http.patch(ApiEndpoints.AchatsOnglet.update(id), payload, { headers }).subscribe({
      error: err => console.error("PATCH achats échoué", err)
    });

  }
}
