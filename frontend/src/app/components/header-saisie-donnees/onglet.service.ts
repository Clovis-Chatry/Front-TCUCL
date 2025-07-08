// onglet.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ApiEndpoints } from '../../services/api-endpoints'; // à adapter

@Injectable({
  providedIn: 'root'
})
export class OngletService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  getOngletIds(entiteId: number, annee: number) {
    const token = this.auth.getToken();
    if (!token) return;

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    };

    const url = `${ApiEndpoints.Onglets.getAllIds(entiteId)}?annee=${annee}`;
    return this.http.get<{ [key: string]: number }>(url, { headers });
  }

  getOngletStatuses(entiteId: number, annee: number) {
    const token = this.auth.getToken();
    if (!token) return;

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    };

    const idsUrl = `${ApiEndpoints.Onglets.getAllIds(entiteId)}?annee=${annee}`;
    const statusUrl = ApiEndpoints.Onglets.getAllStatus(entiteId, annee);

    return forkJoin([
      this.http.get<{ [key: string]: number }>(idsUrl, { headers }),
      this.http.get<{ [key: string]: boolean }>(statusUrl, { headers })
    ]).pipe(
      map(([idsMap, statusMap]) => {
        const result: Record<string, boolean> = {};
        for (const [key, id] of Object.entries(idsMap)) {
          const status = (statusMap as Record<string, boolean>)[id];
          if (status !== undefined) {
            result[key] = status;
          }
        }
        return result;
      })
    );
  }

  getStatutsParEntiteEtAnnee(entiteId: number, annee: number) {
    return this.getOngletStatuses(entiteId, annee);
  }
}
