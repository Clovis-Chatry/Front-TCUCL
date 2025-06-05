import { Injectable } from '@angular/core';
import { EquipementNumerique } from '../../../models/numerique.model';
import { NUMERIQUE_EQUIPEMENT } from '../../../models/enums/numerique.enum';

@Injectable({ providedIn: 'root' })
export class NumeriqueOngletMapperService {
  private normalizeEquipement(value: string): NUMERIQUE_EQUIPEMENT | string {
    const upper = value?.toUpperCase();
    const found = (Object.values(NUMERIQUE_EQUIPEMENT) as string[]).find(v => v.toUpperCase() === upper);
    return (found as NUMERIQUE_EQUIPEMENT) || value;
  }

  fromDto(dto: any): { cloudDataDisponible: boolean | null; traficCloud: number | null; tipUtilisateur: number | null; equipements: EquipementNumerique[] } {
    const equipements: EquipementNumerique[] = (dto.equipementNumeriqueList || []).map((e: any) => ({
      equipement: this.normalizeEquipement(e.equipement) as NUMERIQUE_EQUIPEMENT,
      nombre: e.nombre ?? null,
      dureeAmortissement: e.dureeAmortissement ?? null,
      emissionsGesPrecisesConnues: e.emissionsGesPrecisesConnues ?? false,
      emissionsReellesParProduitKgCO2e: e.emissionsReellesParProduitKgCO2e ?? null,
      anneeAjout: e.anneeAjout,
    }));

    return {
      cloudDataDisponible: dto.cloudData?.disponible ?? dto.cloudDataDisponible ?? null,
      traficCloud: dto.cloudData?.trafic ?? dto.TraficCloudUtilisateur ?? null,
      tipUtilisateur: dto.cloudData?.tip ?? dto.TraficTipUtilisateur ?? null,
      equipements,
    };
  }

  toDto(model: { estTermine?: boolean; note?: string; cloudDataDisponible: boolean | null; traficCloud: number | null; tipUtilisateur: number | null; equipements: EquipementNumerique[] }): any {
    return {
      estTermine: model.estTermine,
      note: model.note,
      cloudDataDisponible: model.cloudDataDisponible,
      TraficCloudUtilisateur: model.traficCloud,
      TraficTipUtilisateur: model.tipUtilisateur,
      equipementNumeriqueList: model.equipements.map(e => ({
        equipement: typeof e.equipement === 'string' ? e.equipement : e.equipement.toString(),
        nombre: e.nombre,
        dureeAmortissement: e.dureeAmortissement,
        emissionsGesPrecisesConnues: e.emissionsGesPrecisesConnues,
        emissionsReellesParProduitKgCO2e: e.emissionsReellesParProduitKgCO2e,
      })),
    };
  }
}
