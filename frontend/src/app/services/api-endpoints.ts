const BASE_URL = 'http://localhost:8080';

export const ApiEndpoints = {

  EnergieOnglet: {
    getById: (id: string) => `${BASE_URL}/energieonglet/20`,
    updateConso: (id: string) => `${BASE_URL}/energieonglet/20`,
  },

  EmissionFugitivesOnglet: {
    getMachineById: (id: string) => `${BASE_URL}/emissionFugitiveOnglet/57`,
    addMachine: (id: string) => `${BASE_URL}/emissionFugitiveOnglet/57/machine`,
    deleteMachine: (id: string, idMachine: string) => `${BASE_URL}/emissionFugitiveOnglet/57/machine/${idMachine}`,
  },

  DomTravOnglet: {
    getById: (id: string) => `${BASE_URL}/mobiliteDomicileTravailOnglet/23`,
    update: (id: string) => `${BASE_URL}/mobiliteDomicileTravailOnglet/23`,
  },
  AutreMobFrOnglet: {
    getById: (id: string) => `${BASE_URL}/autreMobFrOnglet/16`,
    update: (id: string) => `${BASE_URL}/autreMobFrOnglet/16`,
  },
  DechetsOnglet: {
    getById: (id: string) => `${BASE_URL}/dechetsonglet/${id}`,
    updateOrdureMenagere: (id: string) => `${BASE_URL}/dechetsonglet/${id}/orduresMenageres`,
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
