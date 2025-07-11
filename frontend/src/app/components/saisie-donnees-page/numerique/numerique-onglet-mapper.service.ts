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
      id: e.id,
      equipement: this.normalizeEquipement(e.equipement ?? e.type) as NUMERIQUE_EQUIPEMENT,
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
      traficCloud: dto.traficCloudUtilisateur != null ? Number(dto.traficCloudUtilisateur) : null,
      tipUtilisateur: dto.traficTipUtilisateur != null ? Number(dto.traficTipUtilisateur) : null,
      partTraficFranceEtranger:
        dto.partTraficFranceEtranger != null && !isNaN(Number(dto.partTraficFranceEtranger))
          ? Number(dto.partTraficFranceEtranger)
          : null,
      equipements,
    };
  }

  toDto(model: NumeriqueModel): any {
    return {
      estTermine: model.estTermine,
      note: model.note,
      cloudDataDisponible: model.cloudDataDisponible,
      traficCloudUtilisateur: model.traficCloud != null ? Number(model.traficCloud) : null,
      traficTipUtilisateur: model.tipUtilisateur != null ? Number(model.tipUtilisateur) : null,
      partTraficFranceEtranger:
        model.partTraficFranceEtranger != null && !isNaN(Number(model.partTraficFranceEtranger))
          ? Number(model.partTraficFranceEtranger)
          : null,
      equipementNumeriqueList: model.equipements.map((e: EquipementNumerique) => ({
        id: e.id,
        equipement: typeof e.equipement === 'string' ? e.equipement : (e.equipement as NUMERIQUE_EQUIPEMENT).toString(),
        nombre: e.nombre,
        dureeAmortissement: e.dureeAmortissement,
        emissionsGesPrecisesConnues: e.emissionsGesPrecisesConnues,
        emissionsReellesParProduitKgCO2e: e.emissionsReellesParProduitKgCO2e,
      })),
    };
  }

  toEquipementDto(e: EquipementNumerique): any {
    return {
      id: e.id,
      equipement: typeof e.equipement === 'string' ? e.equipement : (e.equipement as NUMERIQUE_EQUIPEMENT).toString(),
      nombre: e.nombre,
      dureeAmortissement: e.dureeAmortissement,
      emissionsGesPrecisesConnues: e.emissionsGesPrecisesConnues,
      emissionsReellesParProduitKgCO2e: e.emissionsReellesParProduitKgCO2e,
    };
  }
}
