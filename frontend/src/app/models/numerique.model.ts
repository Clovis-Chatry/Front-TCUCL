import {NUMERIQUE_EQUIPEMENT} from '../zip/numerique.enum';

export interface EquipementNumerique {
  equipement: NUMERIQUE_EQUIPEMENT;
  nombre: number | null;
  dureeAmortissement: number | null;
  emissionsGesPrecisesConnues: boolean;
  emissionsReellesParProduitKgCO2e?: number | null;
  anneeAjout?: number;
}

export interface NumeriqueModel {
  estTermine?: boolean;
  note?: string;
  cloudDataDisponible: boolean | null;
  traficCloud: number | null;
  tipUtilisateur: number | null;
  partTraficFranceEtranger: number | null;
  equipements: EquipementNumerique[];
}
