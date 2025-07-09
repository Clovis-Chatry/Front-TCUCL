import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { ApiEndpoints } from '../../../services/api-endpoints';
import { Pays } from '../../../models/enums/pays.enum';
import { SaveFooterComponent } from '../../save-footer/save-footer.component';
import { OngletStatusService } from '../../../services/onglet-status.service';
import { ONGLET_KEYS } from '../../../constants/onglet-keys';
import { MobInterOngletMapperService } from './mob-inter-onglet-mapper.service';
import { MobInternationalOngletModel, Voyage } from '../../../models/mob-international.model';

@Component({
  selector: 'app-destination-page',
  standalone: true,
  templateUrl: './mob-inter-saisie-donnees-page.component.html',
  styleUrls: ['./mob-inter-saisie-donnees-page.component.scss'],
  imports: [FormsModule, HttpClientModule, CommonModule, SaveFooterComponent]
})
export class MobiliteInternationaleSaisieDonneesPageComponent implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private statusService = inject(OngletStatusService);
  private mapper = inject(MobInterOngletMapperService);

  onglet: MobInternationalOngletModel = { voyages: [] };

  nouveauVoyage: Voyage = {
    nomPays: '' as any,
    prosAvion: null,
    prosTrain: null,
    stagesEtudiantsAvion: null,
    stagesEtudiantsTrain: null,
    semestresEtudiantsAvion: null,
    semestresEtudiantsTrain: null
  };

  ONGLET_KEYS = ONGLET_KEYS;
  listePays = Object.values(Pays);

  ngOnInit(): void {
    this.onglet.estTermine = this.statusService.getStatus(ONGLET_KEYS.MobInternationale);
    this.statusService.statuses$.subscribe(s => {
      this.onglet.estTermine = s[ONGLET_KEYS.MobInternationale] ?? false;
    });
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) this.loadData(id);
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
      Authorization: `Bearer ${token}`
    };

    this.http.get<any>(ApiEndpoints.mobInternationaleOnglet.getById(id), { headers }).subscribe({
      next: data => {
        const model = this.mapper.fromDto(data);
        this.onglet.voyages = model.voyages;
        this.onglet.estTermine = model.estTermine ?? false;
        this.onglet.note = model.note;
        this.statusService.setStatus(ONGLET_KEYS.MobInternationale, this.onglet.estTermine ?? false);
      },
      error: err => console.error("Erreur lors du chargement des données", err)
    });
  }

  ajouterVoyage(): void {
    this.onglet.voyages.push({ ...this.nouveauVoyage });
    this.nouveauVoyage = {
      nomPays: '' as any,
      prosAvion: null,
      prosTrain: null,
      stagesEtudiantsAvion: null,
      stagesEtudiantsTrain: null,
      semestresEtudiantsAvion: null,
      semestresEtudiantsTrain: null
    };
    this.updateData();
  }

  supprimerVoyage(index: number): void {
    this.onglet.voyages.splice(index, 1);
    this.updateData();
  }

  onEstTermineChange(value: boolean): void {
    this.onglet.estTermine = value;
    this.updateData();
  }

  updateData(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const token = this.authService.getToken();
    if (!id || !token) return;

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    };

    const payload = this.mapper.toDto(this.onglet);

    this.http.patch(ApiEndpoints.mobInternationaleOnglet.update(id), payload, { headers }).subscribe({
      error: err => console.error('PATCH mobilite internationale echoue', err)
    });
  }
}
