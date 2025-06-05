import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ApiEndpoints } from '../../../services/api-endpoints';
import { CommonModule } from '@angular/common';
import { SaveFooterComponent } from '../../save-footer/save-footer.component';
import { OngletStatusService } from '../../../services/onglet-status.service';

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

    this.http.get<any>(ApiEndpoints.AchatsOnglet.getById(id), { headers }).subscribe(
      (data) => {
        this.items = {
          // Consommables
          papierCons: data.papierCons,
          livresCons: data.livresCons,
          cartonNeufCons: data.cartonNeufCons,
          cartonRecycleCons: data.cartonRecycleCons,
          fournituresCons: data.fournituresCons,
          jetEncreConsTonnes: null,
          jetEncreConsRamettes: null,
          tonerConsTonnes: null,
          tonerConsRamettes: null,
          jetEncreCons: data.feuillesJetEncreCons,
          tonerCons: data.feuillesTonerCons,
          pharmaCons: data.pharmaCons,
          servicesCons: data.servicesCons,
          serviceEnseignementCons: data.serviceEnseignementCons,
          serviceProduitsInformatiqueCons: data.serviceProduitsInformatiqueCons,
          serviceReparationsMachinesCons: data.serviceReparationsMachinesCons,
          serviceTransportCons: data.serviceTransportCons,
          serviceHebergementRestaurationCons: data.serviceHebergementRestaurationCons,
          serviceTelecomCons: data.serviceTelecomCons,

          // Textile
          papierTextile: data.papierTextile,
          livresTextile: data.livresTextile,
          cartonNeufTextile: data.cartonNeufTextile,
          cartonRecycleTextile: data.cartonRecycleTextile,
          fournituresTextile: data.fournituresTextile,
          jetEncreTextileTonnes: null,
          jetEncreTextileRamettes: null,
          tonerTextileTonnes: null,
          tonerTextileRamettes: null,
          jetEncreTextile: data.feuillesJetEncreTextile,
          tonerTextile: data.feuillesTonerTextile,
          pharmaTextile: data.pharmaTextile,

          // Restauration
          hasBilanCarbone: data.bilanCarboneRestauration !== null,
          bilanCarboneTotal: data.bilanCarboneRestauration,
          connaitQuantiteAliments: data.connaitQuantiteAliment,
          boeuf: data.quantiteBoeuf,
          poisson: data.quantitePoisson,
          fromage: data.quantiteFromage,
          boisson: data.quantiteBoisson,
          connaitRepasParType: data.connaitRepasParType,
          repasAnimal: data.repasAnimal,
          repasVegetal: data.repasVegetal,
          repasVegetarien: data.repasVegetarien
        };
      },
      (err) => console.error("Erreur de chargement", err)
    );
  }

  updateAchat(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const token = this.authService.getToken();
    if (!id || !token) return;

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    };

    const payload = {
      papierCons: this.items.papierCons,
      livresCons: this.items.livresCons,
      cartonNeufCons: this.items.cartonNeufCons,
      cartonRecycleCons: this.items.cartonRecycleCons,
      fournituresCons: this.items.fournituresCons,
      jetEncreConsTonnes: this.items.jetEncreConsTonnes,
      jetEncreConsRamettes: this.items.jetEncreConsRamettes,
      tonerConsTonnes: this.items.tonerConsTonnes,
      tonerConsRamettes: this.items.tonerConsRamettes,
      feuillesJetEncreCons: this.items.jetEncreCons,
      feuillesTonerCons: this.items.tonerCons,
      pharmaCons: this.items.pharmaCons,
      servicesCons: this.items.servicesCons,
      serviceEnseignementCons: this.items.serviceEnseignementCons,
      serviceProduitsInformatiqueCons: this.items.serviceProduitsInformatiqueCons,
      serviceReparationsMachinesCons: this.items.serviceReparationsMachinesCons,
      serviceTransportCons: this.items.serviceTransportCons,
      serviceHebergementRestaurationCons: this.items.serviceHebergementRestaurationCons,
      serviceTelecomCons: this.items.serviceTelecomCons,

      papierTextile: this.items.papierTextile,
      livresTextile: this.items.livresTextile,
      cartonNeufTextile: this.items.cartonNeufTextile,
      cartonRecycleTextile: this.items.cartonRecycleTextile,
      fournituresTextile: this.items.fournituresTextile,
      jetEncreTextileTonnes: this.items.jetEncreTextileTonnes,
      jetEncreTextileRamettes: this.items.jetEncreTextileRamettes,
      tonerTextileTonnes: this.items.tonerTextileTonnes,
      tonerTextileRamettes: this.items.tonerTextileRamettes,
      feuillesJetEncreTextile: this.items.jetEncreTextile,
      feuillesTonerTextile: this.items.tonerTextile,
      pharmaTextile: this.items.pharmaTextile,

      bilanCarboneRestauration: this.items.hasBilanCarbone ? this.items.bilanCarboneTotal : null,
      connaitQuantiteAliment: this.items.connaitQuantiteAliments,
      quantiteBoeuf: this.items.boeuf,
      quantitePoisson: this.items.poisson,
      quantiteFromage: this.items.fromage,
      quantiteBoisson: this.items.boisson,
      connaitRepasParType: this.items.connaitRepasParType,
      repasAnimal: this.items.repasAnimal,
      repasVegetal: this.items.repasVegetal,
      repasVegetarien: this.items.repasVegetarien,
      estTermine: this.estTermine
    };

    this.http.patch(ApiEndpoints.AchatsOnglet.update(id), payload, { headers }).subscribe({
      error: err => console.error('PATCH achats échoué', err)
    });
  }
}
