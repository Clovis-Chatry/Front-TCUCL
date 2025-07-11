import { PARKING_VOIRIE_TYPE, PARKING_VOIRIE_TYPE_STRUCTURE } from './enums/parking-voirie.enum';

export interface ParkingVoirie {
  id?: number;
  nomOuAdresse: string;
  dateConstruction: string | null;
  emissionsGesConnues: boolean;
  emissionsGesReelles: number | null;
  type: PARKING_VOIRIE_TYPE;
  nombreM2: number | null;
  typeStructure: PARKING_VOIRIE_TYPE_STRUCTURE;
  dateAjoutEnBase?: string | null;
}

export interface ParkingVoirieOngletModel {
  estTermine?: boolean;
  note?: string;
  parkings: ParkingVoirie[];
}
