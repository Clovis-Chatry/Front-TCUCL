import {TypeMachine} from './typeMachine';

export const TypeMachineLabels: Record<TypeMachine, string> = {
  [TypeMachine.ARMOIRE]: "Armoire",
  [TypeMachine.DRV]: "DRV",
  [TypeMachine.EAU_GLACEE_MOINS_50KW]: "Eau glacée < 50kW",
  [TypeMachine.EAU_GLACEE_PLUS_50KW]: "Eau glacée > 50kW",
  [TypeMachine.INCONNU]: "Inconnu",
  [TypeMachine.NA]: "NA",
};
