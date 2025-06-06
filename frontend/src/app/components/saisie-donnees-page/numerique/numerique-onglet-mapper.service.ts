import { Injectable } from '@angular/core';
import { EquipementNumerique, NumeriqueModel } from '../../../models/numerique.model';
import { NUMERIQUE_EQUIPEMENT } from '../../../models/enums/numerique.enum';

@Injectable({ providedIn: 'root' })
export class NumeriqueOngletMapperService {
  private normalizeEquipement(value: string): NUMERIQUE_EQUIPEMENT | string {
    const upper = value?.toUpperCase();
    const found = (Object.values(NUMERIQUE_EQUIPEMENT) as string[]).find(v => v.toUpperCase() === upper);
    return (found as NUMERIQUE_EQUIPEMENT) || value;
  }

  fromDto(dto: any): NumeriqueModel {
    const equipements: EquipementNumerique[] = (dto.equipementNumeriqueList || []).map((e: any) => ({
      equipement: this.normalizeEquipement(e.equipement) as NUMERIQUE_EQUIPEMENT,
      nombre: e.nombre ?? null,
      dureeAmortissement: e.dureeAmortissement ?? null,
      emissionsGesPrecisesConnues: e.emissionsGesPrecisesConnues ?? false,
      emissionsReellesParProduitKgCO2e: e.emissionsReellesParProduitKgCO2e ?? null,
      anneeAjout: e.anneeAjout,
    }));

    return {
      estTermine: dto.estTermine,
      note: dto.note,
      cloudDataDisponible: dto.cloudDataDisponible ?? null,
      traficCloud: dto.TraficCloudUtilisateur ?? null,
      tipUtilisateur: dto.TraficTipUtilisateur ?? null,
      partTraficFranceEtranger: dto.PartTraficFranceEtranger ?? null,
      equipements,
    };
  }

  toDto(model: NumeriqueModel): any {
    return {
      estTermine: model.estTermine,
      note: model.note,
      cloudDataDisponible: model.cloudDataDisponible,
      TraficCloudUtilisateur: model.traficCloud,
      TraficTipUtilisateur: model.tipUtilisateur,
      PartTraficFranceEtranger: model.partTraficFranceEtranger,
      equipementNumeriqueList: model.equipements.map((e: EquipementNumerique) => ({
        type: typeof e.equipement === 'string' ? e.equipement : (e.equipement as NUMERIQUE_EQUIPEMENT).toString(),
        nombre: e.nombre,
        dureeAmortissement: e.dureeAmortissement,
        emissionsGesPrecisesConnues: e.emissionsGesPrecisesConnues,
        emissionsReellesParProduitKgCO2e: e.emissionsReellesParProduitKgCO2e,
      })),
    };
  }
}
