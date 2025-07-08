import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndpoints } from './api-endpoints';
import { AuthService } from './auth.service';

export interface SyntheseEgesResult {
  consoEnergieFinale: number;
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
