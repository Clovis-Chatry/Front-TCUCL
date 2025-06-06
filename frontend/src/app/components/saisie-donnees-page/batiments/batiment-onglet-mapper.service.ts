import { Injectable } from '@angular/core';
import { BatimentOngletModel, BatimentExistantOuNeufConstruit, EntretienCourant, MobilierElectromenager } from '../../../models/batiment.model';
import { EnumBatiment_TypeBatiment, EnumBatiment_TypeStructure, EnumBatiment_TypeTravaux, EnumBatiment_TypeMobilier } from '../../../models/bat.enum';

@Injectable({ providedIn: 'root' })
export class BatimentOngletMapperService {
  fromDto(dto: any): BatimentOngletModel {
    const batiments: BatimentExistantOuNeufConstruit[] = (dto.batimentsExistantOuNeufConstruits || []).map((b: any) => ({
      id: b.id,
      nom_ou_adresse: b.nom_ou_adresse ?? '',
      dateConstruction: b.dateConstruction ?? null,
      moinsDe50ans: b.moinsDe50ans ?? null,
      renoComplete: b.renoComplete ?? null,
      dateDerniereGrosseRenovation: b.dateDerniereGrosseRenovation ?? null,
      acvBatimentRealisee: b.acvBatimentRealisee ?? null,
      emissionsGesReellesTCO2: b.emissionsGesReellesTCO2 ?? null,
      typeBatiment: b.typeBatiment as EnumBatiment_TypeBatiment,
      surfaceEnM2: b.surfaceEnM2 ?? null,
      typeStructure: b.typeStructure as EnumBatiment_TypeStructure,
      dateAjoutEnBase: b.dateAjoutEnBase ?? null,
    }));

    const entretiens: EntretienCourant[] = (dto.entretiensCourants || []).map((e: any) => ({
      id: e.id,
      dateAjout: e.dateAjout ?? null,
      nom_adresse: e.nom_adresse ?? '',
      typeTravaux: e.typeTravaux as EnumBatiment_TypeTravaux,
      dateTravaux: e.dateTravaux ?? null,
      typeBatiment: e.typeBatiment as EnumBatiment_TypeBatiment,
      surfaceConcernee: e.surfaceConcernee ?? null,
      dureeAmortissement: e.dureeAmortissement ?? null,
    }));

    const mobiliers: MobilierElectromenager[] = (dto.mobiliers || []).map((m: any) => ({
      id: m.id,
      dateAjout: m.dateAjout ?? null,
      mobilier: m.mobilier as EnumBatiment_TypeMobilier,
      quantite: m.quantite ?? null,
      poidsDuProduit: m.poidsDuProduit ?? null,
      dureeAmortissement: m.dureeAmortissement ?? null,
    }));

    return {
      estTermine: dto.estTermine,
      note: dto.note,
      batiments,
      entretiens,
      mobiliers,
    };
  }

  toDto(model: BatimentOngletModel): any {
    return {
      estTermine: model.estTermine,
      note: model.note,
      batimentsExistantOuNeufConstruits: model.batiments.map((b: BatimentExistantOuNeufConstruit) => ({
        id: b.id,
        nom_ou_adresse: b.nom_ou_adresse,
        dateConstruction: b.dateConstruction,
        moinsDe50ans: b.moinsDe50ans,
        renoComplete: b.renoComplete,
        dateDerniereGrosseRenovation: b.dateDerniereGrosseRenovation,
        acvBatimentRealisee: b.acvBatimentRealisee,
        emissionsGesReellesTCO2: b.emissionsGesReellesTCO2,
        typeBatiment: typeof b.typeBatiment === 'string' ? b.typeBatiment : (b.typeBatiment as EnumBatiment_TypeBatiment).toString(),
        surfaceEnM2: b.surfaceEnM2,
        typeStructure: typeof b.typeStructure === 'string' ? b.typeStructure : (b.typeStructure as EnumBatiment_TypeStructure).toString(),
        dateAjoutEnBase: b.dateAjoutEnBase,
      })),
      entretiensCourants: model.entretiens.map((e: EntretienCourant) => ({
        id: e.id,
        dateAjout: e.dateAjout,
        nom_adresse: e.nom_adresse,
        typeTravaux: typeof e.typeTravaux === 'string' ? e.typeTravaux : (e.typeTravaux as EnumBatiment_TypeTravaux).toString(),
        dateTravaux: e.dateTravaux,
        typeBatiment: typeof e.typeBatiment === 'string' ? e.typeBatiment : (e.typeBatiment as EnumBatiment_TypeBatiment).toString(),
        surfaceConcernee: e.surfaceConcernee,
        dureeAmortissement: e.dureeAmortissement,
      })),
      mobiliers: model.mobiliers.map((m: MobilierElectromenager) => ({
        id: m.id,
        dateAjout: m.dateAjout,
        mobilier: typeof m.mobilier === 'string' ? m.mobilier : (m.mobilier as EnumBatiment_TypeMobilier).toString(),
        quantite: m.quantite,
        poidsDuProduit: m.poidsDuProduit,
        dureeAmortissement: m.dureeAmortissement,
      })),
    };
  }
}
