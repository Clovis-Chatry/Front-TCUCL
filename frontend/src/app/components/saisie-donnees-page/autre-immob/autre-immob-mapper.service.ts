import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AutreImmobMapperService {
  fromDto(dto: any): any {
    const machines: any[] = [];
    const pushMachine = (
      type: string,
      nombre: any,
      poids: any,
      amortissement: any,
      gesConnu: any,
      gesReel: any
    ) => {
      if (
        nombre != null ||
        poids != null ||
        amortissement != null ||
        gesConnu != null ||
        gesReel != null
      ) {
        machines.push({
          nom: type,
          nombre: nombre ?? null,
          poids: poids ?? null,
          amortissement: amortissement ?? null,
          gesConnu: gesConnu ?? null,
          gesReel: gesReel ?? null,
        });
      }
    };

    pushMachine(
      'groupe',
      dto.groupesElectrogenes_Nombre,
      dto.groupesElectrogenes_PoidsDuProduit,
      dto.groupesElectrogenes_DureeAmortissement,
      dto.groupesElectrogenes_IsEmissionConnue,
      dto.groupesElectrogenes_EmissionReelle
    );

    pushMachine(
      'moteur',
      dto.moteurElectrique_Nombre,
      dto.moteurElectrique_PoidsDuProduit,
      dto.moteurElectrique_DureeAmortissement,
      dto.moteurElectrique_IsEmissionConnue,
      dto.moteurElectrique_EmissionReelle
    );

    pushMachine(
      'autresKg',
      dto.autresMachinesKg_Nombre,
      dto.autresMachinesKg_PoidsDuProduit,
      dto.autresMachinesKg_DureeAmortissement,
      dto.autresMachinesKg_IsEmissionConnue,
      dto.autresMachinesKg_EmissionReelle
    );

    pushMachine(
      'autresEur',
      dto.autresMachinesEur_Nombre,
      dto.autresMachinesEur_PoidsDuProduit,
      dto.autresMachinesEur_DureeAmortissement,
      dto.autresMachinesEur_IsEmissionConnue,
      dto.autresMachinesEur_EmissionReelle
    );

    const hasPvData =
      dto.installationComplete_PuissanceTotale != null ||
      dto.panneaux_PuissanceTotale != null ||
      dto.onduleur_PuissanceTotale != null ||
      dto.cablageEtStructure_PuissanceTotale != null;

    return {
      pvInstallationPuissance: dto.installationComplete_PuissanceTotale ?? null,
      pvInstallationDuree: dto.installationComplete_DureeDeVie ?? null,
      pvInstallationGESConnu: dto.installationComplete_IsEmissionGESConnues ?? null,
      pvInstallationGESReel: dto.installationComplete_EmissionDeGes ?? null,
      pvPanneauxPuissance: dto.panneaux_PuissanceTotale ?? null,
      pvPanneauxDuree: dto.panneaux_DureeDeVie ?? null,
      pvPanneauxGESConnu: dto.panneaux_IsEmissionGESConnues ?? null,
      pvPanneauxGESReel: dto.panneaux_EmissionDeGes ?? null,
      pvOnduleursPuissance: dto.onduleur_PuissanceTotale ?? null,
      pvOnduleursDuree: dto.onduleur_DureeDeVie ?? null,
      pvOnduleursGESConnu: dto.onduleur_IsEmissionGESConnues ?? null,
      pvOnduleursGESReel: dto.onduleur_EmissionDeGes ?? null,
      pvCablagePuissance: dto.cablageEtStructure_PuissanceTotale ?? null,
      pvCablageDuree: dto.cablageEtStructure_DureeDeVie ?? null,
      pvCablageGESConnu: dto.cablageEtStructure_IsEmissionGESConnues ?? null,
      pvCablageGESReel: dto.cablageEtStructure_EmissionDeGes ?? null,
      hasPanneaux: hasPvData,
      machinesElectriques: machines.length > 0,
      machines,
      estTermine: dto.estTermine ?? false,
      note: dto.note ?? ''
    };
  }

  toDto(model: any): any {
    const payload: any = {
      installationComplete_PuissanceTotale: model.pvInstallationPuissance,
      installationComplete_DureeDeVie: model.pvInstallationDuree,
      installationComplete_IsEmissionGESConnues: model.pvInstallationGESConnu,
      installationComplete_EmissionDeGes: model.pvInstallationGESReel,
      panneaux_PuissanceTotale: model.pvPanneauxPuissance,
      panneaux_DureeDeVie: model.pvPanneauxDuree,
      panneaux_IsEmissionGESConnues: model.pvPanneauxGESConnu,
      panneaux_EmissionDeGes: model.pvPanneauxGESReel,
      onduleur_PuissanceTotale: model.pvOnduleursPuissance,
      onduleur_DureeDeVie: model.pvOnduleursDuree,
      onduleur_IsEmissionGESConnues: model.pvOnduleursGESConnu,
      onduleur_EmissionDeGes: model.pvOnduleursGESReel,
      cablageEtStructure_PuissanceTotale: model.pvCablagePuissance,
      cablageEtStructure_DureeDeVie: model.pvCablageDuree,
      cablageEtStructure_IsEmissionGESConnues: model.pvCablageGESConnu,
      cablageEtStructure_EmissionDeGes: model.pvCablageGESReel,
      estTermine: model.estTermine,
      note: model.note
    };

    const map: Record<string, any> = {};

    if (Array.isArray(model.machines)) {
      model.machines.forEach((m: any) => {
        map[m.nom] = m;
      });
    }

    const groupe = map['groupe'] || {};
    payload.groupesElectrogenes_Nombre = groupe.nombre ?? null;
    payload.groupesElectrogenes_PoidsDuProduit = groupe.poids ?? null;
    payload.groupesElectrogenes_DureeAmortissement = groupe.amortissement ?? null;
    payload.groupesElectrogenes_IsEmissionConnue = groupe.gesConnu ?? null;
    payload.groupesElectrogenes_EmissionReelle = groupe.gesReel ?? null;

    const moteur = map['moteur'] || {};
    payload.moteurElectrique_Nombre = moteur.nombre ?? null;
    payload.moteurElectrique_PoidsDuProduit = moteur.poids ?? null;
    payload.moteurElectrique_DureeAmortissement = moteur.amortissement ?? null;
    payload.moteurElectrique_IsEmissionConnue = moteur.gesConnu ?? null;
    payload.moteurElectrique_EmissionReelle = moteur.gesReel ?? null;

    const autresKg = map['autresKg'] || {};
    payload.autresMachinesKg_Nombre = autresKg.nombre ?? null;
    payload.autresMachinesKg_PoidsDuProduit = autresKg.poids ?? null;
    payload.autresMachinesKg_DureeAmortissement = autresKg.amortissement ?? null;
    payload.autresMachinesKg_IsEmissionConnue = autresKg.gesConnu ?? null;
    payload.autresMachinesKg_EmissionReelle = autresKg.gesReel ?? null;

    const autresEur = map['autresEur'] || {};
    payload.autresMachinesEur_Nombre = autresEur.nombre ?? null;
    payload.autresMachinesEur_PoidsDuProduit = autresEur.poids ?? null;
    payload.autresMachinesEur_DureeAmortissement = autresEur.amortissement ?? null;
    payload.autresMachinesEur_IsEmissionConnue = autresEur.gesConnu ?? null;
    payload.autresMachinesEur_EmissionReelle = autresEur.gesReel ?? null;

    return payload;
  }
}
