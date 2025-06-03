import {Injectable} from '@angular/core';
import {TransportDomTrav} from '../../../models/transport-data.model';
import {GROUPE_VOYAGEURS, MODE_TRANSPORT_DOM_TRAV} from '../../../models/enums/transport.enum';

@Injectable({providedIn: 'root'})
export class TransportDataDomTravMapperService {

  parseFlatData(data: any): TransportDomTrav[] {
    const result: TransportDomTrav[] = [];

    for (const key of Object.keys(data)) {
      const match = key.match(/^(.*)(Etudiant|Salarie)Km$/);
      if (match) {
        const rawMode = match[1];
        const rawGroup = match[2];

        const transportMode = this.mapKeyToMode(rawMode);
        const travelerGroup = rawGroup === 'Etudiant'
          ? GROUPE_VOYAGEURS.ETUDIANTS
          : GROUPE_VOYAGEURS.SALARIES;

        if (transportMode && data[key] != null) {
          result.push({
            travelerGroup,
            transportMode,
            distanceKm: data[key]
          });
        }
      }
    }
    return result;
  }

  buildFlatPayload(
    items: TransportDomTrav[],
    nbJoursEtudiant?: number,
    nbJoursSalarie?: number
  ): any {
    const payload: any = {};

    for (const item of items) {
      if (item.transportMode === MODE_TRANSPORT_DOM_TRAV.NOMBRE_TRAJETS) {
        continue;
      }

      const group = item.travelerGroup === GROUPE_VOYAGEURS.ETUDIANTS ? 'Etudiant' : 'Salarie';
      const prefix = this.mapModeToKey(item.transportMode);
      if (prefix) {
        const key = `${prefix}${group}Km`;
        payload[key] = item.distanceKm;
      }
    }
    if (nbJoursEtudiant != null) {
      payload['nbJoursDeplacementEtudiant'] = nbJoursEtudiant;
    }
    if (nbJoursSalarie != null) {
      payload['nbJoursDeplacementSalarie'] = nbJoursSalarie;
    }

    return payload;
  }

  private mapKeyToMode(key: string): MODE_TRANSPORT_DOM_TRAV | null {
    switch (key.toLowerCase()) {
      case 'nombretrajets':
        return MODE_TRANSPORT_DOM_TRAV.NOMBRE_TRAJETS;
      case 'marcheapied':
        return MODE_TRANSPORT_DOM_TRAV.A_PIED;
      case 'bus':
        return MODE_TRANSPORT_DOM_TRAV.BUS;
      case 'metrotramway':
        return MODE_TRANSPORT_DOM_TRAV.METRO_TRAM;
      case 'moto':
        return MODE_TRANSPORT_DOM_TRAV.MOTO;
      case 'trainregional':
        return MODE_TRANSPORT_DOM_TRAV.TRAIN_REGIONAL;
      case 'trottinetteelectrique':
        return MODE_TRANSPORT_DOM_TRAV.TROTTINETTE;
      case 'veloelectrique':
        return MODE_TRANSPORT_DOM_TRAV.VELO_ELECTRIQUE;
      case 'velo':
        return MODE_TRANSPORT_DOM_TRAV.VELO_MECANIQUE;
      case 'voitureelectrique':
        return MODE_TRANSPORT_DOM_TRAV.VOITURE_ELECTRIQUE;
      case 'voiturehybride':
        return MODE_TRANSPORT_DOM_TRAV.VOITURE_HYBRIDE;
      case 'voiturethermique':
        return MODE_TRANSPORT_DOM_TRAV.VOITURE_THERMIQUE;
      default:
        return null;
    }
  }

  private mapModeToKey(mode: MODE_TRANSPORT_DOM_TRAV): string | null {
    switch (mode) {
      case MODE_TRANSPORT_DOM_TRAV.NOMBRE_TRAJETS:
        return 'nombreTrajets';
      case MODE_TRANSPORT_DOM_TRAV.A_PIED:
        return 'marcheAPied';
      case MODE_TRANSPORT_DOM_TRAV.BUS:
        return 'bus';
      case MODE_TRANSPORT_DOM_TRAV.METRO_TRAM:
        return 'metroTramway';
      case MODE_TRANSPORT_DOM_TRAV.MOTO:
        return 'moto';
      case MODE_TRANSPORT_DOM_TRAV.TRAIN_REGIONAL:
        return 'trainRegional';
      case MODE_TRANSPORT_DOM_TRAV.TROTTINETTE:
        return 'trottinetteElectrique';
      case MODE_TRANSPORT_DOM_TRAV.VELO_ELECTRIQUE:
        return 'veloElectrique';
      case MODE_TRANSPORT_DOM_TRAV.VELO_MECANIQUE:
        return 'velo';
      case MODE_TRANSPORT_DOM_TRAV.VOITURE_ELECTRIQUE:
        return 'voitureElectrique';
      case MODE_TRANSPORT_DOM_TRAV.VOITURE_HYBRIDE:
        return 'voitureHybride';
      case MODE_TRANSPORT_DOM_TRAV.VOITURE_THERMIQUE:
        return 'voitureThermique';
      default:
        return null;
    }
  }
}
