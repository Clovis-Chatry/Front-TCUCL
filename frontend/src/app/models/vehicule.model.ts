import { VEHICULE_TYPE } from './enums/vehicule.enum';

export interface Vehicule {
  id?: number;
  modeleOuImmatriculation: string;
  typeVehicule: VEHICULE_TYPE;
  nombreVehiculesIdentiques: number | null;
  nombreKilometresParVoitureMoyen: number | null;
  dateAjoutEnBase?: string | null;
}

export interface VehiculeOngletModel {
  estTermine?: boolean;
  note?: string;
  vehicules: Vehicule[];
}
