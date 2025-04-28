// src/app/shared/api-endpoints.ts

const BASE_URL = 'http://localhost:4200';

export const ApiEndpoints = {
  EnergieOnglet: {
    getById: (id: string) => `${BASE_URL}/api/energieOnglet/${id}`,
    updateConsoGaz: (id: string) => `${BASE_URL}/api/energieOnglet/${id}/consoGaz`,
    // tu ajoutes ici toutes les autres routes PATCH, GET, POST...
  },
  // Tu pourras rajouter ici d'autres blocs pour d'autres entités si besoin
};
