const BASE_URL = 'http://localhost:8080';

export const ApiEndpoints = {
  EnergieOnglet: {
    getById: (id: string) => `${BASE_URL}/energieonglet/58`,
    updateConso: (id: string) => `${BASE_URL}/energieonglet/58`,
    // autres méthodes PATCH (comme /consoGaz, /consoFioul, etc.)
    patchConsoGaz: (id: string) => `${BASE_URL}/energieonglet/${id}/consoGaz`,
    patchNote: (id: string) => `${BASE_URL}/energieonglet/${id}/note`,
  },
  EmissionFugitivesOnglet: {
    getMachineById: (id: string) => `${BASE_URL}/emissionfugitivesonglet/${id}`,
    addMachine: (id: string) => `${BASE_URL}/emissionfugitivesonglet/${id}/machine`,
    deleteMachine: (id: string, idMachine: string) => `${BASE_URL}/emissionfugitivesonglet/${id}/machine/${idMachine}`,
  },
  // Tu pourras rajouter ici d'autres blocs pour d'autres entités si besoin

  DomTravOnglet: {
    getById: (id: string) => `${BASE_URL}/mobilitedomtravonglet/${id}`,
    // tu ajoutes ici toutes les autres routes PATCH, GET, POST...
  },
  AutreMobFrOnglet: {
    getById: (id: string) => `${BASE_URL}/autremobonglet/${id}`,
    // tu pourras rajouter ici d'autres routes PATCH pour Cartons, Verre, etc.
  },
  DechetsOnglet: {
    getById: (id: string) => `${BASE_URL}/dechetsonglet/${id}`,
    updateOrdureMenagere: (id: string) => `${BASE_URL}/dechetsonglet/${id}/orduresMenageres`,
    // autres routes PATCH...
  },

AchatsOnglet: {
  getById: (id: string) => `${BASE_URL}/achatsOnglet/${id}`
},

ImmobOnglet: {
  getById: (id: string) => `${BASE_URL}/immobOnglet/${id}`,
  update: (id: string) => `${BASE_URL}/immobOnglet/${id}`
}
};
