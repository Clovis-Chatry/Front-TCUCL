import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../../../services/api-endpoints';

@Injectable({ providedIn: 'root' })
export class NumeriqueService {
  constructor(private http: HttpClient) {}

  getOnglet(id: string, headers: any): Observable<any> {
    return this.http.get<any>(ApiEndpoints.NumeriqueOnglet.getById(id), { headers });
  }

  updateOnglet(id: string, payload: any, headers: any): Observable<any> {
    return this.http.patch<any>(ApiEndpoints.NumeriqueOnglet.update(id), payload, { headers });
  }

  addEquipement(id: string, equipement: any, headers: any): Observable<any> {
    return this.http.post<any>(ApiEndpoints.NumeriqueOnglet.addEquipement(id), equipement, { headers });
  }

  deleteEquipement(id: string, equipId: string, headers: any): Observable<any> {
    return this.http.delete<any>(ApiEndpoints.NumeriqueOnglet.deleteEquipement(id, equipId), { headers });
  }

  updateEquipement(id: string, equipId: string, equipement: any, headers: any): Observable<any> {
    return this.http.patch<any>(ApiEndpoints.NumeriqueOnglet.updateEquipement(id, equipId), equipement, { headers });
  }

  getResult(id: string, headers: any): Observable<any> {
    return this.http.get<any>(ApiEndpoints.NumeriqueOnglet.getResult(id), { headers });
  }
}
