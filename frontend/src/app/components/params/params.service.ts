import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoints } from '../../services/api-endpoints';
import { Observable } from 'rxjs';
import { UtilisateurDto } from '../../models/user.model';
import { EntityNomId } from './params.component';

@Injectable({ providedIn: 'root' })
export class ParamService {
  constructor(private http: HttpClient) { }

  updateUserInfos(utilisateurId: number, payload: { prenom: string; nom: string; email: string }, headers: any): Observable<any> {
    return this.http.patch(ApiEndpoints.Utilisateur.modifierSesInfos(utilisateurId), payload, { headers });
  }

  creerEntite(body: any, headers: { [key: string]: string }) {
    return this.http.post<any>(ApiEndpoints.Utilisateur.creerEntite(), body, { headers });
  }

  changePassword(body: { email: string, ancienMdp: string, nouveauMdp: string }, headers: any): Observable<any> {
    return this.http.post(ApiEndpoints.Utilisateur.changerMdp(), body, { headers });
  }

  getUtilisateurParEntiteId(entiteId: number, headers: any): Observable<UtilisateurDto[]> {
    return this.http.get<UtilisateurDto[]>(ApiEndpoints.Utilisateur.recupererUtilisateurPourEntite(entiteId), { headers });
  }

  creerutilisateur(entiteId: number, body: any, headers: any): Observable<UtilisateurDto[]> {
    return this.http.post<UtilisateurDto[]>(ApiEndpoints.Utilisateur.creerutilisateur(entiteId), body, { headers });
  }

  modifierEstAdmin(userId: number, estAdmin: boolean, headers: { [key: string]: string }) {
    const url = ApiEndpoints.Utilisateur.updateAdminStatus(userId) + `?estAdmin=${estAdmin}`;
    return this.http.patch(url, {}, { headers });
  }

  getAllEntiteNomId(headers: any): Observable<{ id: number, nom: string }[]> {
    return this.http.get<EntityNomId[]>(ApiEndpoints.Utilisateur.getAllEntiteNomId(), { headers });
  }

  deleterUser(utilisateurId: number, headers: any) {
    return this.http.delete(ApiEndpoints.Utilisateur.deleterUser(utilisateurId), { headers })
  }

  importerFichier(formData: FormData, headers: any) {
    return this.http.post(ApiEndpoints.Utilisateur.importerFichier(), formData, {
      headers
    });
  }
}
