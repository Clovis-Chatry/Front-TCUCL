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

    if (Array.isArray(model.machines)) {
      model.machines.forEach((m: any) => {
        switch (m.nom) {
          case 'groupe':
            payload.groupesElectrogenes_Nombre = m.nombre;
            payload.groupesElectrogenes_PoidsDuProduit = m.poids;
            payload.groupesElectrogenes_DureeAmortissement = m.amortissement;
            payload.groupesElectrogenes_IsEmissionConnue = m.gesConnu;
            payload.groupesElectrogenes_EmissionReelle = m.gesReel;
            break;
          case 'moteur':
            payload.moteurElectrique_Nombre = m.nombre;
            payload.moteurElectrique_PoidsDuProduit = m.poids;
            payload.moteurElectrique_DureeAmortissement = m.amortissement;
            payload.moteurElectrique_IsEmissionConnue = m.gesConnu;
            payload.moteurElectrique_EmissionReelle = m.gesReel;
            break;
          case 'autresKg':
            payload.autresMachinesKg_Nombre = m.nombre;
            payload.autresMachinesKg_PoidsDuProduit = m.poids;
            payload.autresMachinesKg_DureeAmortissement = m.amortissement;
            payload.autresMachinesKg_IsEmissionConnue = m.gesConnu;
            payload.autresMachinesKg_EmissionReelle = m.gesReel;
            break;
          case 'autresEur':
            payload.autresMachinesEur_Nombre = m.nombre;
            payload.autresMachinesEur_PoidsDuProduit = m.poids;
            payload.autresMachinesEur_DureeAmortissement = m.amortissement;
            payload.autresMachinesEur_IsEmissionConnue = m.gesConnu;
            payload.autresMachinesEur_EmissionReelle = m.gesReel;
            break;
        }
      });
    }

    return payload;
  }
}
