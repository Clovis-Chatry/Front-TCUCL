import {Injectable} from '@angular/core';
import {MobInternationalOngletModel, Voyage} from '../../../models/mob-international.model';
import {Pays} from '../../../models/enums/pays.enum';

@Injectable({ providedIn: 'root' })
export class MobInterOngletMapperService {
  private normalizePays(value: string): Pays | string {
    if (!value) return value;
    const key = Object.keys(Pays).find(k => k.toUpperCase() === value.toUpperCase());
    if (key) {
      return (Pays as any)[key] as Pays;
    }
    const found = (Object.values(Pays) as string[]).find(v => v.toUpperCase() === value.toUpperCase());
    return (found as Pays) || value;
  }

  private toBackendPays(value: Pays | string): string {
    if (!value) return value as string;
    const entry = Object.entries(Pays).find(([enumKey, label]) => label === value);
    return entry ? entry[0] : value.toString();
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

  /**
   * Construit l'objet envoyé à l'API. Les champs numériques nuls ou
   * indéfinis sont convertis en 0 afin d'éviter les erreurs `intValue()`
   * côté backend.
   */
  toVoyageDto(v: Voyage): any {
    const num = (val: number | null | undefined) => val ?? 0;
    return {
      id: v.id,
      nomPays: this.toBackendPays(v.nomPays),
      prosAvion: num(v.prosAvion),
      prosTrain: num(v.prosTrain),
      stagesEtudiantsAvion: num(v.stagesEtudiantsAvion),
      stagesEtudiantsTrain: num(v.stagesEtudiantsTrain),
      semestresEtudiantsAvion: num(v.semestresEtudiantsAvion),
      semestresEtudiantsTrain: num(v.semestresEtudiantsTrain),
      dateAjoutEnBase: v.dateAjoutEnBase,
    };
  }
}
