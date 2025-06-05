import { Injectable } from '@angular/core';
import { EquipementNumerique, NumeriqueOnglet } from '../../../models/numerique.model';
import { NUMERIQUE_EQUIPEMENT } from '../../../models/enums/numerique.enum';

@Injectable({ providedIn: 'root' })
export class NumeriqueOngletMapperService {
  fromDto(dto: any): NumeriqueOnglet {
    const equipements: EquipementNumerique[] = (dto.equipementNumeriqueList || []).map((e: any) => ({
      id: e.id,
      equipement: e.equipement as NUMERIQUE_EQUIPEMENT,
      nombre: e.nombre ?? null,
      dureeAmortissement: e.dureeAmortissement ?? null,
      emissionsGesPrecisesConnues: e.emissionsGesPrecisesConnues ?? false,
      emissionsReellesParProduitKgCO2e: e.emissionsReellesParProduitKgCO2e ?? null,
      anneeAjout: e.anneeAjout,
    }));

    return {
      estTermine: dto.estTermine ?? false,
      note: dto.note ?? '',
      cloudDataDisponible: dto.cloudData?.disponible ?? null,
      traficCloud: dto.cloudData?.trafic ?? null,
      tipUtilisateur: dto.cloudData?.tip ?? null,
      equipements,
    };
  }

  toDto(model: NumeriqueOnglet): any {
    return {
      estTermine: model.estTermine,
      note: model.note,
      cloudData: {
        disponible: model.cloudDataDisponible,
        trafic: model.traficCloud,
        tip: model.tipUtilisateur,
      },
      equipementNumeriqueList: model.equipements.map(e => ({
        id: e.id,
        equipement: e.equipement,
        nombre: e.nombre,
        dureeAmortissement: e.dureeAmortissement,
        emissionsGesPrecisesConnues: e.emissionsGesPrecisesConnues,
        emissionsReellesParProduitKgCO2e: e.emissionsReellesParProduitKgCO2e,
      })),
    };
  }
}
