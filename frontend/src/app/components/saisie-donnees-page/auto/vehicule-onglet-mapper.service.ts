import { Injectable } from '@angular/core';
import { VEHICULE_TYPE } from '../../../models/enums/vehicule.enum';
import { Vehicule, VehiculeOngletModel } from '../../../models/vehicule.model';

@Injectable({ providedIn: 'root' })
export class VehiculeOngletMapperService {
  private readonly backendToLocal: Record<string, VEHICULE_TYPE> = {
    VEHICULE_THERMIQUE: VEHICULE_TYPE.THERMIQUE,
    VEHICULE_HYBRIDE: VEHICULE_TYPE.HYBRIDE,
    VEHICULE_ELECTRIQUE: VEHICULE_TYPE.ELECTRIQUE,
  };

  private readonly localToBackend: Record<VEHICULE_TYPE, string> = {
    [VEHICULE_TYPE.THERMIQUE]: 'VEHICULE_THERMIQUE',
    [VEHICULE_TYPE.HYBRIDE]: 'VEHICULE_HYBRIDE',
    [VEHICULE_TYPE.ELECTRIQUE]: 'VEHICULE_ELECTRIQUE',
  };

  private normalizeType(value: string): VEHICULE_TYPE | string {
    const upper = value?.toUpperCase();
    const found = (Object.values(VEHICULE_TYPE) as string[]).find(v => v.toUpperCase() === upper);
    return (found as VEHICULE_TYPE) || value;
  }

  fromDto(dto: any): VehiculeOngletModel {
    const vehicules: Vehicule[] = (dto.vehiculeList || []).map((v: any) => {
      const backendType = v.typeVehicule as string;
      const localType = this.backendToLocal[backendType] ?? this.normalizeType(backendType);
      return {
        id: v.id,
        modeleOuImmatriculation: v.modeleOuImmatriculation ?? '',
        typeVehicule: localType as VEHICULE_TYPE,
        nombreVehiculesIdentiques: v.nombreVehiculesIdentiques ?? null,
        nombreKilometresParVoitureMoyen: v.nombreKilometresParVoitureMoyen ?? null,
        dateAjoutEnBase: v.dateAjoutEnBase ?? null,
      };
    });

    return {
      estTermine: dto.estTermine,
      note: dto.note,
      vehicules,
    };
  }

  toDto(model: VehiculeOngletModel): any {
    return {
      estTermine: model.estTermine,
      note: model.note,
      vehiculeList: model.vehicules.map(v => ({
        id: v.id,
        modeleOuImmatriculation: v.modeleOuImmatriculation,
        typeVehicule: this.localToBackend[v.typeVehicule] ?? v.typeVehicule.toString(),
        nombreVehiculesIdentiques: v.nombreVehiculesIdentiques,
        nombreKilometresParVoitureMoyen: v.nombreKilometresParVoitureMoyen,
        dateAjoutEnBase: v.dateAjoutEnBase,
      })),
    };
  }
}
