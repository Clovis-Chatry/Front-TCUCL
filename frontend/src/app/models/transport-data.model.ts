import {GROUPE_VOYAGEURS, MODE_TRANSPORT_AUTRE_MOB, MODE_TRANSPORT_DOM_TRAV} from './enums/transport.enum';

export interface TransportDomTrav {
  travelerGroup: GROUPE_VOYAGEURS;
  transportMode: MODE_TRANSPORT_DOM_TRAV;
  distanceKm: number;
}

export interface TransportAutreMob {
  travelerGroup: GROUPE_VOYAGEURS;
  transportMode: MODE_TRANSPORT_AUTRE_MOB;
  distanceKm: number;
  oneWayTrips: number;
}
