import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ApiEndpoints } from '../../../services/api-endpoints';
import {
  TRANSPORT_MODES,
  TransportDataExtended,
  TransportMode, TransportEntry
} from '../../../models/transport-data.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-autre-mob-saisie-donnees-page',
  standalone: true,
  templateUrl: './autre-mob-saisie-donnees-page.component.html',
  styleUrls: ['./autre-mob-saisie-donnees-page.component.scss'],
  imports: [FormsModule]
})
export class AutreMobSaisieDonneesPageComponent implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  items: TransportDataExtended = {};

  moyens: TransportMode[] = TRANSPORT_MODES;
  mode!:TransportMode;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadData(id);
      }
    });

    // Initialiser tous les champs à 0 pour éviter les erreurs de binding
    this.moyens.forEach(mode => {
      this.items[mode.etudiantKey] = { trips: 0, distance: 0 };
      this.items[mode.salarieKey] = { trips: 0, distance: 0 };
    });
  }

  loadData(id: string): void {
    const token = this.authService.getToken();
    if (!token) {
      console.error('Token manquant');
      return;
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    this.http.get<TransportDataExtended>(ApiEndpoints.AutreMobFrOnglet.getById(id), { headers }).subscribe(
      (data) => {
        this.items = { ...this.items, ...data };
      },
      (error) => {
        console.error('Erreur de chargement des données', error);
      }
    );
  }
  getEntry(key: string): TransportEntry {
    if (!this.items[key]) {
      this.items[key] = { trips: 0, distance: 0 };
    }
    return this.items[key];
  }

}
