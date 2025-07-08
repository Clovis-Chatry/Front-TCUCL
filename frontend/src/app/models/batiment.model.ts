import { EnumBatiment_TypeBatiment, EnumBatiment_TypeStructure, EnumBatiment_TypeTravaux, EnumBatiment_TypeMobilier } from './bat.enum';

export interface BatimentExistantOuNeufConstruit {
  id?: number;
  nom_ou_adresse: string;
  dateConstruction: string | null;
  moinsDe50ans: boolean | null;
  renoComplete: boolean | null;
  dateDerniereGrosseRenovation: string | null;
  acvBatimentRealisee: boolean | null;
  emissionsGesReellesTCO2: number | null;
  typeBatiment: EnumBatiment_TypeBatiment | string;
  surfaceEnM2: number | null;
  typeStructure: EnumBatiment_TypeStructure | string;
  dateAjoutEnBase?: string | null;
}

export interface EntretienCourant {
  id?: number;
  dateAjout: string | null;
  nom_adresse: string;
  typeTravaux: EnumBatiment_TypeTravaux | string;
  dateTravaux: string | null;
  typeBatiment: EnumBatiment_TypeBatiment | string;
  surfaceConcernee: number | null;
  dureeAmortissement: number | null;
}

export interface MobilierElectromenager {
  id?: number;
  dateAjout: string | null;
  mobilier: EnumBatiment_TypeMobilier | string;
  quantite: number | null;
  poidsDuProduit: number | null;
  dureeAmortissement: number | null;
}

export interface BatimentOngletModel {
  estTermine?: boolean;
  note?: string;
  batiments: BatimentExistantOuNeufConstruit[];
  entretiens: EntretienCourant[];
  mobiliers: MobilierElectromenager[];
}
