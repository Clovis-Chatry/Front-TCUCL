import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiEndpoints} from '../../services/api-endpoints';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ParamService {
  constructor(private http: HttpClient) {}

  updateUserInfos(utilisateurId: number, payload: { prenom: string; nom: string; email: string }, headers: any): Observable<any> {
    return this.http.patch(ApiEndpoints.Utilisateur.modifierSesInfos(utilisateurId), payload, {headers});
  }
}
