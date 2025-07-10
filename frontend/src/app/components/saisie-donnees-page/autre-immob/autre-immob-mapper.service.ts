import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AutreImmobMapperService {
  fromDto(dto: any): any {
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
      estTermine: dto.estTermine ?? false,
      note: dto.note ?? ''
    };
  }

  toDto(model: any): any {
    return {
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
      estTermine: model.estTermine,
      note: model.note
    };
  }
}
