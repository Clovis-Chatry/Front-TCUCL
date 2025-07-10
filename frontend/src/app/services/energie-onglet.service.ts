import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ApiEndpoints } from './api-endpoints';

interface EnergieResultResponse {
  consoEnergieFinale: number;
}

@Injectable({ providedIn: 'root' })
export class EnergieOngletService {
  constructor(private http: HttpClient) {}

  getConsoEnergieFinale(ongletId: number): Observable<number> {
    return this.http
      .get<EnergieResultResponse>(
        ApiEndpoints.EnergieOnglet.getResult(ongletId.toString())
      )
      .pipe(map(res => res.consoEnergieFinale));
  }
}
