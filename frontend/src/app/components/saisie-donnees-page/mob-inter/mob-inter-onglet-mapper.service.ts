import { Injectable } from '@angular/core';
import { MobInternationalOngletModel, Voyage } from '../../../models/mob-international.model';
import { Pays } from '../../../models/enums/pays.enum';

@Injectable({ providedIn: 'root' })
export class MobInterOngletMapperService {
  private normalizePays(value: string): Pays | string {
    const upper = value?.toUpperCase();
    const found = (Object.values(Pays) as string[]).find(p => p.toUpperCase() === upper);
    return (found as Pays) || value;
  }

  fromDto(dto: any): MobInternationalOngletModel {
    const voyages: Voyage[] = (dto.voyageVersUneDestinationMobInternationale || dto.voyage || []).map((v: any) => ({
      id: v.id,
      nomPays: this.normalizePays(v.nomPays ?? v.pays),
      prosAvion: v.prosAvion ?? null,
      prosTrain: v.prosTrain ?? null,
      stagesEtudiantsAvion: v.stagesEtudiantsAvion ?? null,
      stagesEtudiantsTrain: v.stagesEtudiantsTrain ?? null,
      semestresEtudiantsAvion: v.semestresEtudiantsAvion ?? null,
      semestresEtudiantsTrain: v.semestresEtudiantsTrain ?? null,
      dateAjoutEnBase: v.dateAjoutEnBase ?? null,
    }));

    return {
      estTermine: dto.estTermine,
      note: dto.note,
      voyages,
    };
  }

  toDto(model: MobInternationalOngletModel): any {
    return {
      estTermine: model.estTermine,
      note: model.note,
      voyageVersUneDestinationMobInternationale: model.voyages.map(v => this.toVoyageDto(v)),
    };
  }

  toVoyageDto(v: Voyage): any {
    return {
      id: v.id,
      nomPays: typeof v.nomPays === 'string' ? v.nomPays : (v.nomPays as Pays).toString(),
      prosAvion: v.prosAvion,
      prosTrain: v.prosTrain,
      stagesEtudiantsAvion: v.stagesEtudiantsAvion,
      stagesEtudiantsTrain: v.stagesEtudiantsTrain,
      semestresEtudiantsAvion: v.semestresEtudiantsAvion,
      semestresEtudiantsTrain: v.semestresEtudiantsTrain,
      dateAjoutEnBase: v.dateAjoutEnBase,
    };
  }
}
