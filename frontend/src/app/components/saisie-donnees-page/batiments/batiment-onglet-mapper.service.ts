import { Injectable } from '@angular/core';
import {
  BatimentExistantOuNeufConstruit,
  EntretienCourant,
  MobilierElectromenager,
  BatimentOngletModel
} from '../../../models/batiment.model';

@Injectable({
  providedIn: 'root',
})
export class BatimentOngletMapperService {
  parseDtoToModel(dto: any): BatimentOngletModel {
    return {
      estTermine: dto.estTermine ?? false,
      note: dto.note ?? '',
      batiments: dto.batimentsExistantOuNeufConstruits?.map((b: any) => this.parseBatiment(b)) || [],
      entretiens: dto.entretiensCourants?.map((e: any) => this.parseEntretien(e)) || [],
      mobiliers: dto.mobiliersElectromenagers?.map((m: any) => this.parseMobilier(m)) || [],
    };
  }

  createPayloadFromModel(model: BatimentOngletModel): any {
    return {
      estTermine: model.estTermine ?? false,
      note: model.note ?? '',
      batimentsExistantOuNeufConstruits: model.batiments?.map(b => this.toBatimentPayload(b)) || [],
      entretiensCourants: model.entretiens?.map(e => this.toEntretienPayload(e)) || [],
      mobiliersElectromenagers: model.mobiliers?.map(m => this.toMobilierPayload(m)) || [],
    };
  }

  private parseBatiment(dto: any): BatimentExistantOuNeufConstruit {
    return {
      id: dto.id,
      nom_ou_adresse: dto.nom_ou_adresse,
      surfaceEnM2: dto.surfaceEnM2,
      dateConstruction: dto.dateConstruction,
      dateDerniereGrosseRenovation: dto.dateDerniereGrosseRenovation,
      typeBatiment: dto.typeBatiment,
      typeStructure: dto.typeStructure,
      acvBatimentRealisee: dto.acvBatimentRealisee,
      emissionsGesReellesTCO2: dto.emissionsGesReellesTCO2,
      dateAjoutEnBase: dto.dateAjoutEnBase ?? null
    };
  }

  private toBatimentPayload(b: BatimentExistantOuNeufConstruit): any {
    return {
      id: b.id,
      nom_ou_adresse: b.nom_ou_adresse,
      surfaceEnM2: b.surfaceEnM2,
      dateConstruction: b.dateConstruction,
      dateDerniereGrosseRenovation: b.dateDerniereGrosseRenovation,
      typeBatiment: b.typeBatiment,
      typeStructure: b.typeStructure,
      acvBatimentRealisee: b.acvBatimentRealisee,
      emissionsGesReellesTCO2: b.emissionsGesReellesTCO2
    };
  }

  private parseEntretien(dto: any): EntretienCourant {
    return {
      id: dto.id,
      nom_adresse: dto.nom_adresse,
      surfaceConcernee: dto.surfaceConcernee,
      dateAjout: dto.dateAjout,
      dateTravaux: dto.dateTravaux,
      dureeAmortissement: dto.dureeAmortissement,
      typeTravaux: dto.typeTravaux,
      typeBatiment: dto.typeBatiment
    };
  }

  private toEntretienPayload(e: EntretienCourant): any {
    return {
      id: e.id,
      nom_adresse: e.nom_adresse,
      surfaceConcernee: e.surfaceConcernee,
      dateAjout: e.dateAjout,
      dateTravaux: e.dateTravaux,
      dureeAmortissement: e.dureeAmortissement,
      typeTravaux: e.typeTravaux,
      typeBatiment: e.typeBatiment
    };
  }

  private parseMobilier(dto: any): MobilierElectromenager {
    return {
      id: dto.id,
      mobilier: dto.mobilier,
      quantite: dto.quantite,
      poidsDuProduit: dto.poidsDuProduit,
      dureeAmortissement: dto.dureeAmortissement,
      dateAjout: dto.dateAjout
    };
  }

  private toMobilierPayload(m: MobilierElectromenager): any {
    return {
      id: m.id,
      mobilier: m.mobilier,
      quantite: m.quantite,
      poidsDuProduit: m.poidsDuProduit,
      dureeAmortissement: m.dureeAmortissement,
      dateAjout: m.dateAjout
    };
  }
}
