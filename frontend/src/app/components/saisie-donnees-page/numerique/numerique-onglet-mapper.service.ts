import { EquipementNumerique } from '../../../models/numerique.model';

export class NumeriqueOngletMapperService {
  mapModelToDTO(model: any): any {
    return {
      ...model,
      equipementNumeriqueList: model.equipements.map((e: EquipementNumerique) => ({
        type: e.equipement,
        quantite: e.nombre,
        dureeAmortissement: e.dureeAmortissement,
        emissionsReelles: e.emissionsReellesParProduitKgCO2e,
        emissionsPrecisesConnues: e.emissionsGesPrecisesConnues
      }))
    };
  }
}
