const BASE_URL = 'http://localhost:8080';

export const ApiEndpoints = {
  EnergieOnglet: {
    getById: (id: string) => `${BASE_URL}/energieOnglet/${id}`,
    updateConso: (id: string) => `${BASE_URL}/energieOnglet/${id}`,
  },

  EmissionFugitivesOnglet: {
    getMachineById: (id: string) => `${BASE_URL}/emissionFugitiveOnglet/${id}`,
    addMachine: (id: string) => `${BASE_URL}/emissionFugitiveOnglet/${id}/machine`,
    deleteMachine: (id: string, idMachine: string) =>
      `${BASE_URL}/emissionFugitiveOnglet/${id}/machine/${idMachine}`,
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
    getById: (id: string) => `${BASE_URL}/dechetOnglet/5`,
    update: (id: string) => `${BASE_URL}/dechetOnglet/5`,
  },

  AchatsOnglet: {
    getById: (id: string) => `${BASE_URL}/achatOnglet/${id}`,
  },

  ImmobOnglet: {
    getById: (id: string) => `${BASE_URL}/immobOnglet/${id}`,
    update: (id: string) => `${BASE_URL}/immobOnglet/${id}`,
  },

  NumeriqueOnglet: {
    getById: (id: string) => `${BASE_URL}/numeriqueOnglet/${id}`,
    update: (id: string) => `${BASE_URL}/numeriqueOnglet/${id}`,
  },

  ParkOnglet: {
    getById: (id: string) => `${BASE_URL}/parkOnglet/${id}`,
    update: (id: string) => `${BASE_URL}/parkOnglet/${id}`,
  },

  MobiliteInternationaleOnglet: {
    getById: (id: string) => `${BASE_URL}/mobInternationaleOnglet/${id}`,
    update: (id: string) => `${BASE_URL}/mobInternationaleOnglet/${id}`,
  },

  BatimentsOnglet: {
    getById: (id: string) => `${BASE_URL}/batimentImmobilisationMobilierOnglet/${id}`,
    update: (id: string) => `${BASE_URL}/batimentImmobilisationMobilierOnglet/${id}`,
  },

  AutoOnglet: {
    getById: (id: string) => `${BASE_URL}/vehiculeOnglet/${id}`,
    update: (id: string) => `${BASE_URL}/vehiculeOnglet/${id}`,
  },
};
