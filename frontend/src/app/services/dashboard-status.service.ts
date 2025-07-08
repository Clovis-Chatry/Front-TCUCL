import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { ApiEndpoints } from './api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class DashboardStatusService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  getAllStatuses(id: string): Observable<any> {
    const token = this.authService.getToken();
    if (!token) {
      return of(null);
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    return forkJoin({
      energie: this.http.get(ApiEndpoints.EnergieOnglet.getById(id), { headers }),
      emissionFugitives: this.http.get(ApiEndpoints.EmissionFugitivesOnglet.getMachineById(id), { headers }),
      domTrav: this.http.get(ApiEndpoints.DomTravOnglet.getById(id), { headers }),
      autreMob: this.http.get(ApiEndpoints.AutreMobFrOnglet.getById(id), { headers }),
      dechets: this.http.get(ApiEndpoints.DechetsOnglet.getById(id), { headers }),
      achats: this.http.get(ApiEndpoints.AchatsOnglet.getById(id), { headers }),
      immob: this.http.get(ApiEndpoints.ImmobOnglet.getById(id), { headers }),
      numerique: this.http.get(ApiEndpoints.NumeriqueOnglet.getById(id), { headers }),
      park: this.http.get(ApiEndpoints.ParkOnglet.getById(id), { headers }),
      mobInter: this.http.get(ApiEndpoints.MobiliteInternationaleOnglet.getById(id), { headers }),
      batiments: this.http.get(ApiEndpoints.BatimentsOnglet.getById(id), { headers }),
      auto: this.http.get(ApiEndpoints.AutoOnglet.getById(id), { headers })
    });
  }
}
