import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndpoints } from './api-endpoints';
import { AuthService } from './auth.service';

export interface SyntheseEgesResult {
  emissionFugitivesGlobal: number | null;
  energieGlobal: number | null;
  mobiliteDomicileTravailGlobal: number | null;
  autreMobiliteFrGlobal: number | null;
  mobiliteInternationalGlobal: number | null;
  batimentParkingGlobal: number | null;
  numeriqueGlobal: number | null;
  autreImmobilisationGlobal: number | null;
  achatGlobal: number | null;
  dechetGlobal: number | null;
  bilanCarboneTotalGlobal: number | null;
  consoEnergieFinale?: number | null;
}

@Injectable({ providedIn: 'root' })
export class SyntheseEgesService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  getSynthese(entiteId: number, annee: number): Observable<SyntheseEgesResult> | undefined {
    const token = this.auth.getToken();
    if (!token) return undefined;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    };
    return this.http.get<SyntheseEgesResult>(
      ApiEndpoints.SyntheseEges.getByEntite(entiteId, annee),
      { headers }
    );
  }
}
