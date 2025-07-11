export interface BatimentResultat {
  emissionGESBatimentExistantOuNeufConstruit: Record<number, number>;
  emissionGESEntretienCourant: Record<number, number>;
  emissionGESMobilierElectromenager: Record<number, number>;
  totalPosteBatiment: number | null;
  totalPosteEntretien: number | null;
  totalPosteMobilier: number | null;
}
