import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ApiEndpoints } from '../../../services/api-endpoints';
import { CommonModule } from '@angular/common';
import { SaveFooterComponent } from '../../save-footer/save-footer.component';

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

  items: any = {};

  ngOnInit() {
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
}