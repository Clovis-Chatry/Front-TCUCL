const BASE_URL = 'http://localhost:8080';

export const ApiEndpoints = {
  EnergieOnglet: {
    getById: (id: string) => `${BASE_URL}/energieOnglet/58`,
    updateConso: (id: string) => `${BASE_URL}/energieOnglet/58`,
  },
  EmissionFugitivesOnglet: {
    getMachineById: (id: string) => `${BASE_URL}/emissionFugitiveOnglet/57`,
    addMachine: (id: string) => `${BASE_URL}/emissionFugitiveOnglet/57/machine`,
    deleteMachine: (id: string, idMachine: string) => `${BASE_URL}/emissionFugitiveOnglet/57/machine/${idMachine}`,
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
},
NumeriqueOnglet: {
  getById: (id: string) => `${BASE_URL}/numeriqueOnglet/${id}`,
  update: (id: string) => `${BASE_URL}/numeriqueOnglet/${id}`
},
ParkOnglet: {
  getById: (id: string) => `${BASE_URL}/parkOnglet/${id}`,
  update: (id: string) => `${BASE_URL}/parkOnglet/${id}`
},
MobiliteInternationaleOnglet: {
  getById: (id: string) => `${BASE_URL}/mobiliteInternationaleOnglet/${id}`,
  update: (id: string) => `${BASE_URL}/mobiliteInternationaleOnglet/${id}`
},
BatimentsOnglet: {
  getById: (id: string) => `${BASE_URL}/batimentsOnglet/${id}`,
  update: (id: string) => `${BASE_URL}/batimentsOnglet/${id}`
},
AutoOnglet: {
  getById: (id: string) => `${BASE_URL}/autoOnglet/${id}`,
  update: (id: string) => `${BASE_URL}/autoOnglet/${id}`
}
};
