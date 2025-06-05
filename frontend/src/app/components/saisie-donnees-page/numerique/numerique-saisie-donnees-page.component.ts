import { Component } from '@angular/core';
import { EquipementNumerique } from '../../../models/numerique.model';
import { NUMERIQUE_EQUIPEMENT} from '../../../models/enums/numerique.enum';
import { numeriqueEquipmentLabels } from '../../../models/numerique-equipment-labels';
import {FormsModule} from '@angular/forms';
import {SaveFooterComponent} from '../../save-footer/save-footer.component';

@Component({
  selector: 'app-numerique-saisie-donnees-page',
  templateUrl: './numerique-saisie-donnees-page.component.html',
  imports: [
    FormsModule,
    SaveFooterComponent
  ],
  styleUrls: ['./numerique-saisie-donnees-page.component.scss']
})
export class NumeriqueSaisieDonneesPageComponent {
  numeriqueEquipmentLabels = numeriqueEquipmentLabels;
  equipementOptions = Object.values(NUMERIQUE_EQUIPEMENT).map((value) => ({
    value,
    label: numeriqueEquipmentLabels[value]
  }));

  donneesCloudDisponibles = false;
  traficCloud: number = 0;
  tipUtilisateur: number = 0;

  nouvelEquipement: EquipementNumerique = {
    equipement: NUMERIQUE_EQUIPEMENT.Ecran,
    nombre: 0,
    dureeAmortissement: 0,
    emissionsGesPrecisesConnues: false,
    emissionsReellesParProduitKgCO2e: undefined
  };

  equipementsAjoutes: EquipementNumerique[] = [];
  equipementsAnciens: EquipementNumerique[] = [];

  updateData(): void {
    // Implémentation à ajouter
  }

  ajouterEquipement(): void {
    this.equipementsAjoutes.push({ ...this.nouvelEquipement });
    this.nouvelEquipement = {
      equipement: NUMERIQUE_EQUIPEMENT.Ecran,
      nombre: 0,
      dureeAmortissement: 0,
      emissionsGesPrecisesConnues: false,
      emissionsReellesParProduitKgCO2e: undefined
    };
    this.updateData();
  }

  onEstTermineChange(event: boolean) {
    // Implémentation à ajouter
  }
}
