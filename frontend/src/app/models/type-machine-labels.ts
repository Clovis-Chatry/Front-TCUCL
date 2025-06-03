import {TypeMachineEnum} from './enums/typeMachine.enum';

export const TypeMachineLabels: Record<TypeMachineEnum, string> = {
  [TypeMachineEnum.ARMOIRE]: "Armoire",
  [TypeMachineEnum.DRV]: "DRV",
  [TypeMachineEnum.EAU_GLACEE_MOINS_50KW]: "Eau glacée < 50kW",
  [TypeMachineEnum.EAU_GLACEE_PLUS_50KW]: "Eau glacée > 50kW",
  [TypeMachineEnum.INCONNU]: "Inconnu",
  [TypeMachineEnum.NA]: "NA",
};
