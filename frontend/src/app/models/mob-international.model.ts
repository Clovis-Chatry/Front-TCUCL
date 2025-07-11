import { Pays } from './enums/pays.enum';

export interface Voyage {
  id?: number;
  nomPays: Pays | string;
  prosAvion: number | null;
  prosTrain: number | null;
  stagesEtudiantsAvion: number | null;
  stagesEtudiantsTrain: number | null;
  semestresEtudiantsAvion: number | null;
  semestresEtudiantsTrain: number | null;
  dateAjoutEnBase?: string | null;
}

export interface MobInternationalOngletModel {
  estTermine?: boolean;
  note?: string;
  voyages: Voyage[];
}
