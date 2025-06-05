// onglet.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}
