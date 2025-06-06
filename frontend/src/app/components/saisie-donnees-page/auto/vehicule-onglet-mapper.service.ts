import { Injectable } from '@angular/core';
import { VEHICULE_TYPE } from '../../../models/enums/vehicule.enum';
import { Vehicule, VehiculeOngletModel } from '../../../models/vehicule.model';

@Injectable({ providedIn: 'root' })
export class VehiculeOngletMapperService {
  private normalizeType(value: string): VEHICULE_TYPE | string {
    const upper = value?.toUpperCase();
    const found = (Object.values(VEHICULE_TYPE) as string[]).find(v => v.toUpperCase() === upper);
    return (found as VEHICULE_TYPE) || value;
  }

  fromDto(dto: any): VehiculeOngletModel {
    const vehicules: Vehicule[] = (dto.vehiculeList || []).map((v: any) => ({
      id: v.id,
      modeleOuImmatriculation: v.modeleOuImmatriculation ?? '',
      typeVehicule: this.normalizeType(v.typeVehicule) as VEHICULE_TYPE,
      nombreVehiculesIdentiques: v.nombreVehiculesIdentiques ?? null,
      nombreKilometresParVoitureMoyen: v.nombreKilometresParVoitureMoyen ?? null,
      dateAjoutEnBase: v.dateAjoutEnBase ?? null,
    }));

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
        typeVehicule: typeof v.typeVehicule === 'string' ? v.typeVehicule : (v.typeVehicule as VEHICULE_TYPE).toString(),
        nombreVehiculesIdentiques: v.nombreVehiculesIdentiques,
        nombreKilometresParVoitureMoyen: v.nombreKilometresParVoitureMoyen,
        dateAjoutEnBase: v.dateAjoutEnBase,
      })),
    };
  }
}
