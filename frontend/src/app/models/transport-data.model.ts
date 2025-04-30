export interface TransportData {
  busSalarie: number;
  busEtudiant: number;
  aPiedsSalarie: number;
  aPiedsEtudiant: number;
  voitureThSalarie: number;
  voitureThEtudiant: number;
  voitureElecSalarie: number;
  voitureElecEtudiant: number;
  voitureHybSalarie: number;
  voitureHybEtudiant: number;
  veloSalarie: number;
  veloEtudiant: number;
  trainRegSalarie: number;
  trainRegEtudiant: number;
  metroTramSalarie: number;
  metroTramEtudiant: number;
  motoSalarie: number;
  motoEtudiant: number;
  veloElecSalarie: number;
  veloElecEtudiant: number;
  veloMecSalarie: number;
  veloMecEtudiant: number;
  trottinetteSalarie: number;
  trottinetteEtudiant: number;
}

export interface TransportEntry {
  trips: number;
  distance: number;
}

export interface TransportDataExtended {
  [key: string]: TransportEntry;
}

export interface TransportMode {
  label: string;
  etudiantKey: keyof TransportData;
  salarieKey: keyof TransportData;
}

export const TRANSPORT_MODES: TransportMode[] = [
  { label: 'À pied', etudiantKey: 'aPiedsEtudiant', salarieKey: 'aPiedsSalarie' },
  { label: 'Bus', etudiantKey: 'busEtudiant', salarieKey: 'busSalarie' },
  { label: 'Métro / Tram', etudiantKey: 'metroTramEtudiant', salarieKey: 'metroTramSalarie' },
  { label: 'Moto', etudiantKey: 'motoEtudiant', salarieKey: 'motoSalarie' },
  { label: 'Train régional', etudiantKey: 'trainRegEtudiant', salarieKey: 'trainRegSalarie' },
  { label: 'Trottinette', etudiantKey: 'trottinetteEtudiant', salarieKey: 'trottinetteSalarie' },
  { label: 'Vélo', etudiantKey: 'veloEtudiant', salarieKey: 'veloSalarie' },
  { label: 'Vélo électrique', etudiantKey: 'veloElecEtudiant', salarieKey: 'veloElecSalarie' },
  { label: 'Vélo mécanique', etudiantKey: 'veloMecEtudiant', salarieKey: 'veloMecSalarie' },
  { label: 'Voiture électrique', etudiantKey: 'voitureElecEtudiant', salarieKey: 'voitureElecSalarie' },
  { label: 'Voiture hybride', etudiantKey: 'voitureHybEtudiant', salarieKey: 'voitureHybSalarie' },
  { label: 'Voiture thermique', etudiantKey: 'voitureThEtudiant', salarieKey: 'voitureThSalarie' }
];
