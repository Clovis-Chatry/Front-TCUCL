// src/app/shared/machine.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../../services/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class EmmissionsFugtivesService {

  constructor(private http: HttpClient) {}

  getMachines(EmissionFugitivesOnglet: string): Observable<any[]> {
    return this.http.get<any[]>(ApiEndpoints.EmissionFugitivesOnglet.getMachineById(EmissionFugitivesOnglet));
  }

  addMachine(EmissionFugitivesOnglet: string, machine: any): Observable<any> {
    return this.http.post<any>(ApiEndpoints.EmissionFugitivesOnglet.addMachine(EmissionFugitivesOnglet), machine);
  }

  deleteMachine(EmissionFugitivesOnglet: string, machine: any): Observable<any> {
    return this.http.delete<any>(ApiEndpoints.EmissionFugitivesOnglet.deleteMachine(EmissionFugitivesOnglet, machine), machine);
  }
}
