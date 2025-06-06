import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiEndpoints} from '../../services/api-endpoints';
import {Observable} from 'rxjs';
import {UtilisateurDto} from '../../models/user.model';

@Injectable({ providedIn: 'root' })
export class ParamService {
  constructor(private http: HttpClient) {}

  updateUserInfos(utilisateurId: number, payload: { prenom: string; nom: string; email: string }, headers: any): Observable<any> {
    return this.http.patch(ApiEndpoints.Utilisateur.modifierSesInfos(utilisateurId), payload, {headers});
  }

  creerEntite(body: any, headers: { [key: string]: string }) {
    return this.http.post<any>(ApiEndpoints.Utilisateur.creerEntite(), body, { headers });
  }

  getUtilisateurParEntiteId(entiteId: number, headers: any): Observable<UtilisateurDto[]> {
    return this.http.get<UtilisateurDto[]>(ApiEndpoints.Utilisateur.recupererUtilisateurPourEntite(entiteId), {headers});
  }
}
