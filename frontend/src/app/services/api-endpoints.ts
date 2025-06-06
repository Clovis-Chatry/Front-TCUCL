const BASE_URL = 'http://localhost:8080';

export const ApiEndpoints = {
  Onglets: {
    getAllIds: (entiteId: number) => `${BASE_URL}/general/${entiteId}`,
    getAllStatus: (entiteId: number) => `${BASE_URL}/general/status/${entiteId}`
  },

  EnergieOnglet: {
    getById: (id: string) => `${BASE_URL}/energieOnglet/${id}`,
    updateConso: (id: string) => `${BASE_URL}/energieOnglet/${id}`,
  },

  EmissionFugitivesOnglet: {
    getMachineById: (id: string) => `${BASE_URL}/emissionFugitiveOnglet/${id}`,
    addMachine: (id: string) => `${BASE_URL}/emissionFugitiveOnglet/${id}/machine`,
    deleteMachine: (id: string, idMachine: string) =>
      `${BASE_URL}/emissionFugitiveOnglet/${id}/machine/${idMachine}`,
    update: (id: string) => `${BASE_URL}/emissionFugitiveOnglet/${id}`,
  },

  DomTravOnglet: {
    getById: (id: string) => `${BASE_URL}/mobiliteDomicileTravailOnglet/${id}`,
    update: (id: string) => `${BASE_URL}/mobiliteDomicileTravailOnglet/${id}`,
  },

  AutreMobFrOnglet: {
    getById: (id: string) => `${BASE_URL}/autreMobFrOnglet/${id}`,
    update: (id: string) => `${BASE_URL}/autreMobFrOnglet/${id}`,
  },

  DechetsOnglet: {
    getById: (id: string) => `${BASE_URL}/dechetOnglet/${id}`,
    update: (id: string) => `${BASE_URL}/dechetOnglet/${id}`,
  },

  AchatsOnglet: {
    getById: (id: string) => `${BASE_URL}/achatOnglet/${id}`,
    update: (id: string) => `${BASE_URL}/achatOnglet/${id}`,
  },

ImmobOnglet: {
  getById: (id: string) => `${BASE_URL}/immobOnglet/${id}`,
  update: (id: string) => `${BASE_URL}/immobOnglet/${id}`
},
NumeriqueOnglet: {
  getById: (id: string) => `${BASE_URL}/numeriqueOnglet/${id}`,
  update: (id: string) => `${BASE_URL}/numeriqueOnglet/${id}`
},
ParkingVoirieOnglet: {
  getById: (id: string) => `${BASE_URL}/parkingVoirieOnglet/${id}`,
  update: (id: string) => `${BASE_URL}/parkingVoirieOnglet/${id}`,
  addParking: (id: string) => `${BASE_URL}/parkingVoirieOnglet/${id}/parkingVoirie`,
  deleteParking: (ongletId: string, parkingId: string) =>
    `${BASE_URL}/parkingVoirieOnglet/${ongletId}/parkingVoirie/${parkingId}`,
  updateParking: (ongletId: string, parkingId: string) =>
    `${BASE_URL}/parkingVoirieOnglet/${ongletId}/parkingVoirie/${parkingId}`,
  getResult: (id: string) => `${BASE_URL}/parkingVoirieOnglet/${id}/resultat`
},
MobiliteInternationaleOnglet: {
  getById: (id: string) => `${BASE_URL}/mobiliteInternationaleOnglet/${id}`,
  update: (id: string) => `${BASE_URL}/mobiliteInternationaleOnglet/${id}`
},
BatimentsOnglet: {
  getBatimentImmobilisationMobilier: (id: string) =>
    `${BASE_URL}/batimentImmobilisationMobilierOnglet/${id}`,
  ajouterBatiment: (id: string) => `${BASE_URL}/batimentImmobilisationMobilierOnglet/${id}/batimentExistantOuNeufConstruit`,
  supprimerBatiment: (tabId: string, batimentId: number) => `${BASE_URL}/batimentImmobilisationMobilierOnglet/${tabId}/batimentExistantOuNeufConstruit/${batimentId}`,

  ajouterEntretien: (id: string) => `${BASE_URL}/batimentImmobilisationMobilierOnglet/${id}/entretienCourant`,
  supprimerEntretien: (tabId: string, entretienId: number) => `${BASE_URL}/batimentImmobilisationMobilierOnglet/${tabId}/entretienCourant/${entretienId}`,

  ajouterMobilier: (id: string) => `${BASE_URL}/batimentImmobilisationMobilierOnglet/${id}/mobilierElectromenager`,
  supprimerMobilier: (tabId: string, mobilierId: number) => `${BASE_URL}/batimentImmobilisationMobilierOnglet/${tabId}/mobilierElectromenager/${mobilierId}`,
  update: (id: string) => `${BASE_URL}/batimentImmobilisationMobilierOnglet/${id}`
},
AutoOnglet: {
  getById: (id: string) => `${BASE_URL}/vehiculeOnglet/${id}`,
  update: (id: string) => `${BASE_URL}/vehiculeOnglet/${id}`
}
};
