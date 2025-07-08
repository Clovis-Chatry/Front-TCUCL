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

  consommablesFields = [
    { label: 'Papier', unit: 'Tonnes', key: 'papierCons' },
    { label: 'Papier', unit: 'Ramettes', key: 'papierCons' },
    { label: 'Livres', unit: 'Tonnes', key: 'livresCons' },
    { label: 'Livres', unit: 'Nb', key: 'livresCons' },
    { label: 'Carton neuf', unit: 'Tonnes', key: 'cartonNeufCons' },
    { label: 'Carton recycle', unit: 'Tonnes', key: 'cartonRecycleCons' },
    { label: 'Petites fournitures', unit: 'EUR', key: 'fournituresCons' },
    { label: "Impressions jet d'encre", unit: 'Ramettes', key: 'jetEncreCons' },
    { label: 'Impressions toner', unit: 'Ramettes', key: 'tonerCons' },
    { label: 'Produits pharmaceutiques', unit: 'EUR', key: 'pharmaCons' },
    { label: 'Services (imprimerie, publicité, architecture et ingénierie, maintenance multi-technique des bâtiments)', unit: 'EUR', key: 'servicesCons' },
    { label: 'Service/Enseignement', unit: 'EUR', key: 'serviceEnseignementCons' },
    { label: 'Service/Produits informatiques, électroniques et optiques', unit: 'EUR', key: 'serviceProduitsInformatiqueCons' },
    { label: "Service/Réparation et installation de machines et d'équipements", unit: 'EUR', key: 'serviceReparationsMachinesCons' },
    { label: 'Service/Transport terrestre', unit: 'EUR', key: 'serviceTransportCons' },
    { label: 'Service/"hébergement et restauration"', unit: 'EUR', key: 'serviceHebergementRestaurationCons' },
    { label: 'Service de télécommunications', unit: 'EUR', key: 'serviceTelecomCons' }
  ];

  textileFields = [
    { label: 'Chemise', unit: 'Nb', key: 'chemise' },
    { label: 'Polaire', unit: 'Nb', key: 'polaire' },
    { label: 'Pull acrylique', unit: 'Nb', key: 'pullAcrylique' },
    { label: 'Pull coton', unit: 'Nb', key: 'pullCoton' },
    { label: 'T-shirt polyester', unit: 'Nb', key: 'tshirtPolyester' },
    { label: 'Jean', unit: 'Nb', key: 'jean' },
    { label: 'Sweat', unit: 'Nb', key: 'sweat' },
    { label: 'Veste/Anorak', unit: 'Nb', key: 'veste' },
    { label: 'Manteau', unit: 'Nb', key: 'manteau' },
    { label: 'Chaussure', unit: 'Nb', key: 'chaussure' }
  ];

  alimentsFields = [
    { label: 'Boeuf/agneau/mouton', key: 'boeufAgneauMouton' },
    { label: 'Poulet', key: 'poulet' },
    { label: 'Café', key: 'cafe' },
    { label: 'Chocolat', key: 'chocolat' },
    { label: 'Beurre', key: 'beurre' },
    { label: 'Viandes – moyenne', key: 'viandesMoyenne' },
    { label: 'Produits sucrés – moyenne', key: 'produitsSucresMoyenne' },
    { label: 'Poissons – moyenne', key: 'poissonsMoyenne' },
    { label: 'Fromages – moyenne', key: 'fromagesMoyenne' },
    { label: 'Oléagineux – moyenne', key: 'oleagineuxMoyenne' },
    { label: 'Matières grasses – moyenne', key: 'matieresGrassesMoyenne' },
    { label: 'Boissons – moyenne', key: 'boissonsMoyenne' },
    { label: 'Œufs', key: 'oeufs' },
    { label: 'Céréales – moyenne', key: 'cerealesMoyenne' },
    { label: 'Légumes – moyenne', key: 'legumesMoyenne' },
    { label: 'Fruits – moyenne', key: 'fruitsMoyenne' },
    { label: 'Légumineuse – moyenne', key: 'legumineuseMoyenne' }
  ];

  repasFields = [
    { label: 'Nombre de repas servis – dominante animale boeuf', key: 'nombreRepasServisDominanteAnimaleBoeuf' },
    { label: 'Nombre de repas servis – dominante animale poulet', key: 'nombreRepasServisDominanteAnimalePoulet' },
    { label: 'Nombre de repas servis – dominante végétale boeuf', key: 'nombreRepasServisDominanteVegetaleBoeuf' },
    { label: 'Nombre de repas servis – dominante végétale poulet', key: 'nombreRepasServisDominanteVegetalePoulet' },
    { label: 'Nombre de repas servis – dominante classique boeuf', key: 'nombreRepasServisDominanteClassiqueBoeuf' },
    { label: 'Nombre de repas servis – dominante classique poulet', key: 'nombreRepasServisDominanteClassiquePoulet' },
    { label: 'Nombre de repas servis – repas moyen', key: 'nombreRepasServisRepasMoyen' },
    { label: 'Nombre de repas servis – repas végétarien', key: 'nombreRepasServisRepasVegetarien' }
  ];

  onEstTermineChange(value: boolean): void {
    this.estTermine = value;
    this.updateAchat();
  }

  ngOnInit() {
    this.estTermine = this.statusService.getStatus('achatOnglet');
    this.statusService.statuses$.subscribe(statuses => {
      this.estTermine = statuses['achatOnglet'] ?? false;
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
