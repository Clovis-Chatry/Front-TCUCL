import { TRAITEMENT_DECHET } from './enums/dechet.enum';

export interface DechetData {
  type: string;
  traitement: TRAITEMENT_DECHET | null;
  quantiteTonne: number | null;
}
