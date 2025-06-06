import { Injectable } from '@angular/core';
import { PARKING_VOIRIE_TYPE, PARKING_VOIRIE_TYPE_STRUCTURE } from '../../../models/enums/parking-voirie.enum';
import { ParkingVoirie, ParkingVoirieOngletModel } from '../../../models/parking-voirie.model';

@Injectable({ providedIn: 'root' })
export class ParkingVoirieOngletMapperService {
  private normalizeType(value: string): PARKING_VOIRIE_TYPE | string {
    const upper = value?.toUpperCase();
    const found = (Object.values(PARKING_VOIRIE_TYPE) as string[]).find(v => v.toUpperCase() === upper);
    return (found as PARKING_VOIRIE_TYPE) || value;
  }

  private normalizeStructure(value: string): PARKING_VOIRIE_TYPE_STRUCTURE | string {
    const upper = value?.toUpperCase();
    const found = (Object.values(PARKING_VOIRIE_TYPE_STRUCTURE) as string[]).find(v => v.toUpperCase() === upper);
    return (found as PARKING_VOIRIE_TYPE_STRUCTURE) || value;
  }

  fromDto(dto: any): ParkingVoirieOngletModel {
    const parkings: ParkingVoirie[] = (dto.parkingVoirieList || []).map((p: any) => ({
      id: p.id,
      nomOuAdresse: p.nomOuAdresse ?? '',
      dateConstruction: p.dateConstruction ?? null,
      emissionsGesConnues: p.emissionsGesConnues ?? false,
      emissionsGesReelles: p.emissionsGesReelles ?? null,
      type: this.normalizeType(p.type) as PARKING_VOIRIE_TYPE,
      nombreM2: p.nombreM2 ?? null,
      typeStructure: this.normalizeStructure(p.typeStructure) as PARKING_VOIRIE_TYPE_STRUCTURE,
      dateAjoutEnBase: p.dateAjoutEnBase ?? null,
    }));

    return {
      estTermine: dto.estTermine,
      note: dto.note,
      parkings,
    };
  }

  toDto(model: ParkingVoirieOngletModel): any {
    return {
      estTermine: model.estTermine,
      note: model.note,
      parkingVoirieList: model.parkings.map((p: ParkingVoirie) => ({
        id: p.id,
        nomOuAdresse: p.nomOuAdresse,
        dateConstruction: p.dateConstruction,
        emissionsGesConnues: p.emissionsGesConnues,
        emissionsGesReelles: p.emissionsGesReelles,
        type: typeof p.type === 'string' ? p.type : (p.type as PARKING_VOIRIE_TYPE).toString(),
        nombreM2: p.nombreM2,
        typeStructure: typeof p.typeStructure === 'string' ? p.typeStructure : (p.typeStructure as PARKING_VOIRIE_TYPE_STRUCTURE).toString(),
        dateAjoutEnBase: p.dateAjoutEnBase,
      })),
    };
  }
}
