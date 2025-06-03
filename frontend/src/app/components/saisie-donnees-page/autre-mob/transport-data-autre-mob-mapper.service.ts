import { Injectable } from '@angular/core';
import { TransportAutreMob } from '../../../models/transport-data.model';
import { GROUPE_VOYAGEURS, MODE_TRANSPORT_AUTRE_MOB } from '../../../models/transport.enum';

@Injectable({ providedIn: 'root' })
export class TransportAutreMobMapperService {

  parseFlatData(data: any): TransportAutreMob[] {
    const result: TransportAutreMob[] = [];

    for (const key of Object.keys(data)) {
      const matchDistance = key.match(/^(etudiant|salarie)DistanceTotale_(.+)$/i);
      const matchAller = key.match(/^(etudiant|salarie)NbAllerSimple_(.+)$/i);

      if (matchDistance || matchAller) {
        const groupe = matchDistance ? matchDistance[1] : matchAller![1];
        const modeRaw = matchDistance ? matchDistance[2] : matchAller![2];
        const transportMode = this.mapDtoKeyToEnum(modeRaw);
        const travelerGroup = groupe.toLowerCase() === 'etudiant'
          ? GROUPE_VOYAGEURS.ETUDIANTS
          : GROUPE_VOYAGEURS.SALARIES;

        if (!transportMode) continue;

        let entry = result.find(e =>
          e.transportMode === transportMode && e.travelerGroup === travelerGroup
        );

        if (!entry) {
          entry = {
            transportMode: transportMode as any,
            travelerGroup,
            distanceKm: 0,
            oneWayTrips: 0
          };
          result.push(entry);
        }

        if (matchDistance) {
          entry.distanceKm = data[key] ?? 0;
        } else if (matchAller) {
          entry.oneWayTrips = data[key] ?? 0;
        }
      }
    }

    return result;
  }

  buildFlatPayload(items: TransportAutreMob[]): any {
    const payload: any = {};

    for (const item of items) {
      const groupPrefix = item.travelerGroup === GROUPE_VOYAGEURS.ETUDIANTS ? 'etudiant' : 'salarie';
      const dtoKey = this.mapEnumToDtoKey(item.transportMode);

      if (!dtoKey) continue;

      payload[`${groupPrefix}DistanceTotale_${dtoKey}`] = item.distanceKm;
      payload[`${groupPrefix}NbAllerSimple_${dtoKey}`] = item.oneWayTrips;
    }

    return payload;
  }

  private mapDtoKeyToEnum(key: string): MODE_TRANSPORT_AUTRE_MOB | null {
    switch (key.toLowerCase()) {
      case 'voiturethermique': return MODE_TRANSPORT_AUTRE_MOB.VOITURE_THERMIQUE;
      case 'voitureelectrique': return MODE_TRANSPORT_AUTRE_MOB.VOITURE_ELECTRIQUE;
      case 'avion': return MODE_TRANSPORT_AUTRE_MOB.AVION;
      case 'france_trainregional': return MODE_TRANSPORT_AUTRE_MOB.TRAIN_REGIONAL;
      case 'france_traingrandeslignes': return MODE_TRANSPORT_AUTRE_MOB.TRAIN_GRANDES_LIGNES;
      case 'autocar': return MODE_TRANSPORT_AUTRE_MOB.AUTOCAR;
      default: return null;
    }
  }

  private mapEnumToDtoKey(mode: MODE_TRANSPORT_AUTRE_MOB): string | null {
    switch (mode) {
      case MODE_TRANSPORT_AUTRE_MOB.VOITURE_THERMIQUE: return 'VoitureThermique';
      case MODE_TRANSPORT_AUTRE_MOB.VOITURE_ELECTRIQUE: return 'VoitureElectrique';
      case MODE_TRANSPORT_AUTRE_MOB.AVION: return 'Avion';
      case MODE_TRANSPORT_AUTRE_MOB.TRAIN_REGIONAL: return 'France_TrainRegional';
      case MODE_TRANSPORT_AUTRE_MOB.TRAIN_GRANDES_LIGNES: return 'France_TrainGrandesLignes';
      case MODE_TRANSPORT_AUTRE_MOB.AUTOCAR: return 'Autocar';
      default: return null;
    }
  }
}
