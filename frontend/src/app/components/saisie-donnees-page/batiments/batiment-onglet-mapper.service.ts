import {Injectable} from '@angular/core';
import {
  BatimentExistantOuNeufConstruit,
  BatimentOngletModel,
  EntretienCourant,
  MobilierElectromenager
} from '../../../models/batiment.model';
import {
  EnumBatiment_TypeBatiment,
  EnumBatiment_TypeMobilier,
  EnumBatiment_TypeStructure,
  EnumBatiment_TypeTravaux
} from '../../../models/bat.enum';

@Injectable({providedIn: 'root'})
export class BatimentOngletMapperService {
  batiments: BatimentExistantOuNeufConstruit[] = [];
  entretiens: EntretienCourant[] = [];
  fromDto(dto: any): BatimentOngletModel {
    const batimentDtoList =
      dto.batimentsExistantOuNeufConstruits ??
      dto.batimentsExistantOuNeufConstruitList ??
      dto.batimentExistantOuNeufConstruitList ??
      dto.batimentExistantOuNeufConstruits ??
      dto.batimentExistantOuNeufConstruit ??
      dto.batimentsExistantOuNeufConstruit ??
      dto.batiments ??
      dto.batimentList ??
      [];

    const batiments: BatimentExistantOuNeufConstruit[] = (batimentDtoList || []).map((b: any) => ({
      id: b.id,
      nom_ou_adresse: b.nom_ou_adresse ?? '',
      dateConstruction: b.dateConstruction ?? null,
      dateDerniereGrosseRenovation: b.dateDerniereGrosseRenovation ?? null,
      acvBatimentRealisee: b.acvBatimentRealisee ?? null,
      emissionsGesReellesTCO2: b.emissionsGesReellesTCO2 ?? null,
      typeBatiment: b.typeBatiment as EnumBatiment_TypeBatiment,
      surfaceEnM2: b.surfaceEnM2 ?? null,
      typeStructure: b.typeStructure as EnumBatiment_TypeStructure,
      dateAjoutEnBase: b.dateAjoutEnBase ?? null,
    }));

    const entretienDtoList =
      dto.entretiensCourants ??
      dto.entretiensCourantsList ??
      dto.entretienCourantList ??
      dto.entretienCourantsList ??
      dto.entretiensCourantList ??
      dto.entretienCourants ??
      dto.entretienCourant ??
      dto.entretiens ??
      [];

    const entretiens: EntretienCourant[] = (entretienDtoList || []).map((e: any) => ({
      id: e.id,
      dateAjout: e.dateAjout ?? null,
      nom_adresse: e.nom_adresse ?? '',
      typeTravaux: e.typeTravaux as EnumBatiment_TypeTravaux,
      dateTravaux: e.dateTravaux ?? null,
      typeBatiment: e.typeBatiment as EnumBatiment_TypeBatiment,
      surfaceConcernee: e.surfaceConcernee ?? null,
      dureeAmortissement: e.dureeAmortissement ?? null,
    }));

    const mobilierDtoList =
      dto.mobiliersElectromenagers ??
      dto.mobilierElectromenagerList ??
      dto.mobilierElectromenagers ??
      [];
    const mobiliers: MobilierElectromenager[] = (mobilierDtoList || []).map((m: any) => ({
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
    const batimentList = model.batiments.map((b: BatimentExistantOuNeufConstruit) => ({
      id: b.id,
      nom_ou_adresse: b.nom_ou_adresse,
      dateConstruction: b.dateConstruction,
      dateDerniereGrosseRenovation: b.dateDerniereGrosseRenovation,
      acvBatimentRealisee: b.acvBatimentRealisee,
      emissionsGesReellesTCO2: b.emissionsGesReellesTCO2,
      typeBatiment: typeof b.typeBatiment === 'string' ? b.typeBatiment : (b.typeBatiment as EnumBatiment_TypeBatiment).toString(),
      surfaceEnM2: b.surfaceEnM2,
      typeStructure: typeof b.typeStructure === 'string' ? b.typeStructure : (b.typeStructure as EnumBatiment_TypeStructure).toString(),
      dateAjoutEnBase: b.dateAjoutEnBase,
    }));

    const entretienList = model.entretiens.map((e: EntretienCourant) => ({
      id: e.id,
      dateAjout: e.dateAjout,
      nom_adresse: e.nom_adresse,
      typeTravaux: typeof e.typeTravaux === 'string' ? e.typeTravaux : (e.typeTravaux as EnumBatiment_TypeTravaux).toString(),
      dateTravaux: e.dateTravaux,
      typeBatiment: typeof e.typeBatiment === 'string' ? e.typeBatiment : (e.typeBatiment as EnumBatiment_TypeBatiment).toString(),
      surfaceConcernee: e.surfaceConcernee,
      dureeAmortissement: e.dureeAmortissement,
    }));

    const mobilierList = model.mobiliers.map((m: MobilierElectromenager) => ({
      id: m.id,
      dateAjout: m.dateAjout,
      mobilier: typeof m.mobilier === 'string' ? m.mobilier : (m.mobilier as EnumBatiment_TypeMobilier).toString(),
      quantite: m.quantite,
      poidsDuProduit: m.poidsDuProduit,
      dureeAmortissement: m.dureeAmortissement,
    }));

    return {
      estTermine: model.estTermine,
      note: model.note,
      batimentsExistantOuNeufConstruits: batimentList,
      batimentsExistantOuNeufConstruitList: batimentList,
      batimentExistantOuNeufConstruitList: batimentList,
      batimentExistantOuNeufConstruits: batimentList,
      batiments: batimentList,
      batimentList: batimentList,
      entretiensCourants: entretienList,
      entretiensCourantsList: entretienList,
      entretienCourantList: entretienList,
      entretienCourantsList: entretienList,
      entretienCourants: entretienList,
      entretiens: entretienList,
      mobilierElectromenagerList: mobilierList,
      mobiliersElectromenagers: mobilierList,
    };
  }

  parse(dto: any): void {
    const model = this.fromDto(dto);
    this.batiments = model.batiments;
    this.entretiens = model.entretiens;
  }

  payload(): any {
    const model: BatimentOngletModel = {
      batiments: this.batiments,
      entretiens: this.entretiens,
      mobiliers: [],
    };
    return this.toDto(model);
  }
}
