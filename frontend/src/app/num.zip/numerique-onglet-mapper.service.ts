import { Injectable } from '@angular/core';
import { EquipementNumerique, NumeriqueOnglet } from '../../../models/numerique.model';
import { NUMERIQUE_EQUIPEMENT } from '../../../models/enums/numerique.enum';

@Injectable({ providedIn: 'root' })
export class NumeriqueOngletMapperService {
  private normalizeEquipement(value: string): NUMERIQUE_EQUIPEMENT | string {
    const upper = value?.toUpperCase();
    const found = (Object.values(NUMERIQUE_EQUIPEMENT) as string[]).find(v => v.toUpperCase() === upper);
    return (found as NUMERIQUE_EQUIPEMENT) || value;
  }

  fromDto(dto: any): NumeriqueOnglet {
    const equipements: EquipementNumerique[] = (dto.equipementNumeriqueList || []).map((e: any) => ({
      id: e.id,
      equipement: this.normalizeEquipement(e.equipement),
      nombre: e.nombre ?? null,
      dureeAmortissement: e.dureeAmortissement ?? null,
      emissionsGesPrecisesConnues: e.emissionsGesPrecisesConnues ?? false,
      emissionsReellesParProduitKgCO2e: e.emissionsReellesParProduitKgCO2e ?? null,
      anneeAjout: e.anneeAjout,
    }));

    return {
      estTermine: dto.estTermine ?? false,
      note: dto.note ?? '',
      cloudDataDisponible: dto.cloudData?.disponible ?? dto.cloudDataDisponible ?? null,
      traficCloud: dto.cloudData?.trafic ?? dto.TraficCloudUtilisateur ?? null,
      tipUtilisateur: dto.cloudData?.tip ?? dto.TraficTipUtilisateur ?? null,
      partTraficFranceEtranger: dto.cloudData?.partTraficFranceEtranger ?? dto.PartTraficFranceEtranger ?? null,
      equipements,
    };
  }

  toDto(model: NumeriqueOnglet): any {
    return {
      estTermine: model.estTermine,
      note: model.note,
      cloudDataDisponible: model.cloudDataDisponible,
      TraficCloudUtilisateur: model.traficCloud,
      TraficTipUtilisateur: model.tipUtilisateur,
      PartTraficFranceEtranger: (model as any).partTraficFranceEtranger,
      equipementNumeriqueList: model.equipements.map(e => ({
        id: e.id,
        equipement: typeof e.equipement === 'string' ? e.equipement : e.equipement.toString(),
        nombre: e.nombre,
        dureeAmortissement: e.dureeAmortissement,
        emissionsGesPrecisesConnues: e.emissionsGesPrecisesConnues,
        emissionsReellesParProduitKgCO2e: e.emissionsReellesParProduitKgCO2e,
      })),
    };
  }
}
