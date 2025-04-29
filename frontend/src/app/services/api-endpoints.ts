// src/app/shared/api-endpoints.ts

const BASE_URL = 'http://localhost:8080';

export const ApiEndpoints = {
  EnergieOnglet: {
    getById: (id: string) => `${BASE_URL}/energieonglet/${id}`,
    updateConsoGaz: (id: string) => `${BASE_URL}/energieonglet/${id}/consoGaz`,
    // tu ajoutes ici toutes les autres routes PATCH, GET, POST...
  },
  // Tu pourras rajouter ici d'autres blocs pour d'autres entités si besoin

DechetsOnglet: {
  getById: (id: string) => `${BASE_URL}/dechetsonglet/${id}`,
  updateOrdureMenagere: (id: string) => `${BASE_URL}/dechetsonglet/${id}/orduresMenageres`
  // tu pourras rajouter ici d'autres routes PATCH pour Cartons, Verre, etc.
},
};