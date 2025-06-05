import {NUMERIQUE_EQUIPEMENT} from './enums/numerique.enum';

export interface EquipementNumerique {
  equipement: NUMERIQUE_EQUIPEMENT;
  nombre: number | null;
  dureeAmortissement: number | null;
  emissionsGesPrecisesConnues: boolean;
  emissionsReellesParProduitKgCO2e?: number | null;
  anneeAjout?: number;
}
