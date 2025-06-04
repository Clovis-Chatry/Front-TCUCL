import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiEndpoints} from '../../../services/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class BatimentsService {
  constructor(private http: HttpClient) {}

  getBatimentImmobilisationMobilier(BatimentsOnglet: string, headers: any): Observable<any> {
    return this.http.get<any>(ApiEndpoints.BatimentsOnglet.getBatimentImmobilisationMobilier(BatimentsOnglet), { headers });
  }

  ajouterBatiment(BatimentsOnglet: string, batiment: any, headers: any): Observable<any> {
    return this.http.post(ApiEndpoints.BatimentsOnglet.ajouterBatiment(BatimentsOnglet), batiment, { headers });
  }
}
