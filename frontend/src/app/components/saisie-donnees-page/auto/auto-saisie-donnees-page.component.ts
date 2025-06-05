import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SaveFooterComponent } from '../../save-footer/save-footer.component';
import { AuthService } from '../../../services/auth.service';
import { ApiEndpoints } from '../../../services/api-endpoints';

@Component({
  selector: 'app-auto-saisie-donnees-page',
  standalone: true,
  templateUrl: './auto-saisie-donnees-page.component.html',
  styleUrls: ['./auto-saisie-donnees-page.component.scss'],
  imports: [FormsModule, HttpClientModule, CommonModule, SaveFooterComponent]
})
export class AutoSaisieDonneesPageComponent implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  items: any = {
    voitures: [],
    nomVoiture: '',
    typeVoiture: 'Thermique',
    nombreIdentique: null,
    kmParVoiture: null
  };

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadData(id);
      }
    });
  }

  loadData(id: string): void {
    const token = this.authService.getToken();

    if (!token) {
      console.error("Token d'authentification manquant");
      return;
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    this.http.get<any>(ApiEndpoints.AutoOnglet.getById(id), { headers }).subscribe(
      (data) => {
        this.items = { ...this.items, ...data };
      },
      (error) => {
        console.error("Erreur lors du chargement des données", error);
      }
    );
  }

  ajouterVoiture(): void {
    this.items.voitures.push({
      nom: this.items.nomVoiture,
      type: this.items.typeVoiture,
      quantite: this.items.nombreIdentique,
      km: this.items.kmParVoiture
    });

    // Réinitialisation des champs
    this.items.nomVoiture = '';
    this.items.typeVoiture = 'Thermique';
    this.items.nombreIdentique = null;
    this.items.kmParVoiture = null;
  }

  supprimerVoiture(index: number): void {
    this.items.voitures.splice(index, 1);
  }
}
