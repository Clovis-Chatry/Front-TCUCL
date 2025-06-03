import { Injectable } from '@angular/core';
import { DechetData } from '../../../models/dechet-data-model';
import { TYPE_DECHET } from '../../../models/enums/dechet.enum';

@Injectable({ providedIn: 'root' })
export class DechetDataMapperService {
  parseData(raw: any): DechetData[] {
    return Object.values(TYPE_DECHET).map(type => ({
      type,
      traitement: raw[type]?.traitement ?? null,
      quantiteTonne: raw[type]?.quantiteTonne ?? null
    }));
  }

  buildPayload(items: DechetData[]): any {
    const payload: any = {};
    items.forEach(item => {
      if (item.traitement !== null || item.quantiteTonne !== null) {
        payload[item.type] = {
          traitement: item.traitement,
          quantiteTonne: item.quantiteTonne
        };
      }
    });
    return payload;
  }
}
