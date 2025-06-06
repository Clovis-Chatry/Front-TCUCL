export interface UtilisateurDto {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  entiteId: number;
  entiteNom: string;
  estAdmin: boolean;
  superAdmin: boolean;
}
