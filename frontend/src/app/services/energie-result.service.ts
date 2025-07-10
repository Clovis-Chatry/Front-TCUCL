import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndpoints } from './api-endpoints';
import { AuthService } from './auth.service';

export interface EnergieResult {
  consoEnergieFinale: number;
}

@Injectable({ providedIn: 'root' })
export class EnergieResultService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  getResult(ongletId: string): Observable<EnergieResult> | undefined {
    const token = this.auth.getToken();
    if (!token) return undefined;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    };
    return this.http.get<EnergieResult>(
      ApiEndpoints.EnergieOnglet.getResult(ongletId),
      { headers }
    );
  }
}
