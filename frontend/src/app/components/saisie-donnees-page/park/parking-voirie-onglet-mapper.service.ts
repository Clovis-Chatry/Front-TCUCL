import { Injectable } from '@angular/core';
import { PARKING_VOIRIE_TYPE, PARKING_VOIRIE_TYPE_STRUCTURE } from '../../../models/enums/parking-voirie.enum';
import { ParkingVoirie, ParkingVoirieOngletModel } from '../../../models/parking-voirie.model';

@Injectable({ providedIn: 'root' })
export class ParkingVoirieOngletMapperService {
  private readonly backendToLocal: Record<string, PARKING_VOIRIE_TYPE> = {
    PARKING: PARKING_VOIRIE_TYPE.PARKING,
    VOIRIE: PARKING_VOIRIE_TYPE.VOIRIE,
    NA: PARKING_VOIRIE_TYPE.NA,
  };

  private readonly localToBackend: Record<
    PARKING_VOIRIE_TYPE,
    string
  > = {
    [PARKING_VOIRIE_TYPE.PARKING]: 'PARKING',
    [PARKING_VOIRIE_TYPE.VOIRIE]: 'VOIRIE',
    [PARKING_VOIRIE_TYPE.NA]: 'NA',
  };
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
    const parkings: ParkingVoirie[] = (dto.parkingVoirieList || []).map((p: any) => {
      const backendType = p.type as string;
      const localType = this.backendToLocal[backendType] ?? this.normalizeType(backendType);
      const emissionsGesConnues = p.emissionsGesConnues ?? false;
      const emissionsGesReelles = emissionsGesConnues ? p.emissionsGesReelles ?? null : null;
      return {
        id: p.id,
        nomOuAdresse: p.nomOuAdresse ?? '',
        dateConstruction: p.dateConstruction ?? null,
        emissionsGesConnues,
        emissionsGesReelles,
        type: localType as PARKING_VOIRIE_TYPE,
        nombreM2: p.nombreM2 ?? null,
        typeStructure: this.normalizeStructure(p.typeStructure) as PARKING_VOIRIE_TYPE_STRUCTURE,
        dateAjoutEnBase: p.dateAjoutEnBase ?? null,
      };
    });

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
        emissionsGesReelles: p.emissionsGesConnues ? p.emissionsGesReelles : null,
        type: this.localToBackend[p.type] ?? p.type.toString(),
        nombreM2: p.nombreM2,
        typeStructure: typeof p.typeStructure === 'string' ? p.typeStructure : (p.typeStructure as PARKING_VOIRIE_TYPE_STRUCTURE).toString(),
        dateAjoutEnBase: p.dateAjoutEnBase,
      })),
    };
  }
}
