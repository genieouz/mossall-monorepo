import { DemandeStatus } from './enums/demande-status.enum';

export const DemandeStatusText = {
  [DemandeStatus.REJECTED]: 'Rejetée',
  [DemandeStatus.CANCELLED]: 'Annulée',
  [DemandeStatus.PAYED]: 'Remboursée',
  [DemandeStatus.VALIDATED]: 'Validée',
  [DemandeStatus.PENDING]: 'En cours',
};

export const WaveFees: number = 1.65 / 100;

export const WaveFee = (amount: number): number => amount * WaveFees;
