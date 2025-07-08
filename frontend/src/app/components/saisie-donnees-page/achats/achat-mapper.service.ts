import { Injectable } from '@angular/core';
import { AchatOnglet } from '../../../models/achat.model';

@Injectable({ providedIn: 'root' })
export class AchatMapperService {
  fromDto(dto: any): any {
    const cons = dto.achatConsommable || {};
    const tex = dto.achatTextile || {};
    const rest = dto.achatRestauration || {};
    return {
      // consommables
      papierCons: cons.papier_T,
      livresCons: cons.livres_T,
      cartonNeufCons: cons.cartonNeuf_T,
      cartonRecycleCons: cons.cartonRecycle_T,
      fournituresCons: cons.petitesFournitures_Eur,
      jetEncreCons: cons.nbFeuillesImprimeesJetEncre_Nb,
      tonerCons: cons.nbFeuillesImprimeesToner_Nb,
      pharmaCons: cons.produitsPharmaceutiques_Eur,
      servicesCons: cons.services_imprimerie_publicite_architecture_ingenierie_maintenance_multi_technique_des_batiments,
      serviceEnseignementCons: cons.service_Enseignement,
      serviceProduitsInformatiqueCons: cons.service_Produits_informatiques_electroniques_et_optiques,
      serviceReparationsMachinesCons: cons.service_Reparation_et_installation_de_machines_et_d_equipements,
      serviceTransportCons: cons.service_Transport_terrestre,
      serviceHebergementRestaurationCons: cons.service_hebergement_et_restauration,
      serviceTelecomCons: cons.service_de_telecommunications,

      // textile (approx mapping)
      chemise: tex.Chemise_nb,
      polaire: tex.Polaire_nb,
      pullAcrylique: tex.Pull_Acrylique_nb,
      pullCoton: tex.Pull_Coton_nb,
      tshirtPolyester: tex.T_shirt_polyester_nb,
      jean: tex.Jean_nb,
      sweat: tex.Sweat_nb,
      veste: tex.Veste_Anorak_nb,
      manteau: tex.Manteau_nb,
      chaussure: tex.Chaussure_nb,

      // restauration (subset)
      boeufAgneauMouton: rest.boeufAgneauMouton_Tonnes,
      poulet: rest.poulet_Tonnes,
      cafe: rest.cafe_Tonnes,
      chocolat: rest.chocolat_Tonnes,
      beurre: rest.beurre_Tonnes,
      viandesMoyenne: rest.viandesMoyenne_Tonnes,
      produitsSucresMoyenne: rest.produitsSucresMoyenne_Tonnes,
      poissonsMoyenne: rest.poissonsMoyenne_Tonnes,
      fromagesMoyenne: rest.fromagesMoyenne_Tonnes,
      oleagineuxMoyenne: rest.oleagineuxMoyenne_Tonnes,
      matieresGrassesMoyenne: rest.matieresGrassesMoyenne_Tonnes,
      boissonsMoyenne: rest.boissonsMoyenne_Tonnes,
      oeufs: rest.oeufs_Tonnes,
      cerealesMoyenne: rest.cerealesMoyenne_Tonnes,
      legumesMoyenne: rest.legumesMoyenne_Tonnes,
      fruitsMoyenne: rest.fruitsMoyenne_Tonnes,
      legumineuseMoyenne: rest.legumineuseMoyenne_Tonnes,

      nombreRepasServisDominanteAnimaleBoeuf: rest.nombreRepasServisDominanteAnimaleBoeuf,
      nombreRepasServisDominanteAnimalePoulet: rest.nombreRepasServisDominanteAnimalePoulet,
      nombreRepasServisDominanteVegetaleBoeuf: rest.nombreRepasServisDominanteVegetaleBoeuf,
      nombreRepasServisDominanteVegetalePoulet: rest.nombreRepasServisDominanteVegetalePoulet,
      nombreRepasServisDominanteClassiqueBoeuf: rest.nombreRepasServisDominanteClassiqueBoeuf,
      nombreRepasServisDominanteClassiquePoulet: rest.nombreRepasServisDominanteClassiquePoulet,
      nombreRepasServisRepasMoyen: rest.nombreRepasServisRepasMoyen,
      nombreRepasServisRepasVegetarien: rest.nombreRepasServisRepasVegetarien,

      methodeRapideNombrePersonnesServiesRegimeClassique: rest.methodeRapideNombrePersonnesServiesRegimeClassique,
      methodeRapideNombrePersonnesServiesRegimeFlexitarien: rest.methodeRapideNombrePersonnesServiesRegimeFlexitarien,
      methode: rest.methode,

      estTermine: dto.estTermine ?? false,
      note: dto.note ?? ''
    };
  }

  toDto(model: any): any {
    return {
      estTermine: model.estTermine,
      note: model.note,
      achatConsommable: {
        papier_T: model.papierCons,
        livres_T: model.livresCons,
        cartonNeuf_T: model.cartonNeufCons,
        cartonRecycle_T: model.cartonRecycleCons,
        petitesFournitures_Eur: model.fournituresCons,
        nbFeuillesImprimeesJetEncre_Nb: model.jetEncreCons,
        nbFeuillesImprimeesToner_Nb: model.tonerCons,
        produitsPharmaceutiques_Eur: model.pharmaCons,
        services_imprimerie_publicite_architecture_ingenierie_maintenance_multi_technique_des_batiments: model.servicesCons,
        service_Enseignement: model.serviceEnseignementCons,
        service_Produits_informatiques_electroniques_et_optiques: model.serviceProduitsInformatiqueCons,
        service_Reparation_et_installation_de_machines_et_d_equipements: model.serviceReparationsMachinesCons,
        service_Transport_terrestre: model.serviceTransportCons,
        service_hebergement_et_restauration: model.serviceHebergementRestaurationCons,
        service_de_telecommunications: model.serviceTelecomCons
      },
      achatTextile: {
        Chemise_nb: model.chemise,
        Polaire_nb: model.polaire,
        Pull_Acrylique_nb: model.pullAcrylique,
        Pull_Coton_nb: model.pullCoton,
        T_shirt_polyester_nb: model.tshirtPolyester,
        Jean_nb: model.jean,
        Sweat_nb: model.sweat,
        Veste_Anorak_nb: model.veste,
        Manteau_nb: model.manteau,
        Chaussure_nb: model.chaussure
      },
      achatRestauration: {
        boeufAgneauMouton_Tonnes: model.boeufAgneauMouton,
        poulet_Tonnes: model.poulet,
        cafe_Tonnes: model.cafe,
        chocolat_Tonnes: model.chocolat,
        beurre_Tonnes: model.beurre,
        viandesMoyenne_Tonnes: model.viandesMoyenne,
        produitsSucresMoyenne_Tonnes: model.produitsSucresMoyenne,
        poissonsMoyenne_Tonnes: model.poissonsMoyenne,
        fromagesMoyenne_Tonnes: model.fromagesMoyenne,
        oleagineuxMoyenne_Tonnes: model.oleagineuxMoyenne,
        matieresGrassesMoyenne_Tonnes: model.matieresGrassesMoyenne,
        boissonsMoyenne_Tonnes: model.boissonsMoyenne,
        oeufs_Tonnes: model.oeufs,
        cerealesMoyenne_Tonnes: model.cerealesMoyenne,
        legumesMoyenne_Tonnes: model.legumesMoyenne,
        fruitsMoyenne_Tonnes: model.fruitsMoyenne,
        legumineuseMoyenne_Tonnes: model.legumineuseMoyenne,
        nombreRepasServisDominanteAnimaleBoeuf: model.nombreRepasServisDominanteAnimaleBoeuf,
        nombreRepasServisDominanteAnimalePoulet: model.nombreRepasServisDominanteAnimalePoulet,
        nombreRepasServisDominanteVegetaleBoeuf: model.nombreRepasServisDominanteVegetaleBoeuf,
        nombreRepasServisDominanteVegetalePoulet: model.nombreRepasServisDominanteVegetalePoulet,
        nombreRepasServisDominanteClassiqueBoeuf: model.nombreRepasServisDominanteClassiqueBoeuf,
        nombreRepasServisDominanteClassiquePoulet: model.nombreRepasServisDominanteClassiquePoulet,
        nombreRepasServisRepasMoyen: model.nombreRepasServisRepasMoyen,
        nombreRepasServisRepasVegetarien: model.nombreRepasServisRepasVegetarien,
        methodeRapideNombrePersonnesServiesRegimeClassique: model.methodeRapideNombrePersonnesServiesRegimeClassique,
        methodeRapideNombrePersonnesServiesRegimeFlexitarien: model.methodeRapideNombrePersonnesServiesRegimeFlexitarien,
        methode: model.methode
      }
    };
  }
}
