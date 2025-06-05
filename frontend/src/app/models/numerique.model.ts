import { NUMERIQUE_EQUIPEMENT } from './enums/numerique.enum';

export interface EquipementNumerique {
  id?: number;
  equipement: NUMERIQUE_EQUIPEMENT | string;
  nombre: number | null;
  dureeAmortissement: number | null;
  emissionsGesPrecisesConnues: boolean;
  emissionsReellesParProduitKgCO2e: number | null;
  anneeAjout?: number;
}

export interface NumeriqueOnglet {
  estTermine?: boolean;
  note?: string;
  cloudDataDisponible: boolean | null;
  traficCloud: number | null;
  tipUtilisateur: number | null;
  partTraficFranceEtranger?: number | null;
  equipements: EquipementNumerique[];
}
