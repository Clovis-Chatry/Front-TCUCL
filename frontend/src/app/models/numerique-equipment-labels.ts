import { NUMERIQUE_EQUIPEMENT } from './enums/numerique.enum';

export const numeriqueEquipmentLabels: Record<NUMERIQUE_EQUIPEMENT, string> = {
  [NUMERIQUE_EQUIPEMENT.OrdinateurPortable]: 'Ordinateur portable',
  [NUMERIQUE_EQUIPEMENT.OrdinateurFixe]: 'Ordinateur fixe',
  [NUMERIQUE_EQUIPEMENT.Smartphone]: 'Smartphone',
  [NUMERIQUE_EQUIPEMENT.Tablette]: 'Tablette',
  [NUMERIQUE_EQUIPEMENT.Ecran]: 'Écran',
  [NUMERIQUE_EQUIPEMENT.Serveur]: 'Serveur',
  [NUMERIQUE_EQUIPEMENT.Routeur]: 'Routeur',
  [NUMERIQUE_EQUIPEMENT.Imprimante]: 'Imprimante'
};
