"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaveFee = exports.WaveFees = exports.DemandeStatusText = void 0;
const demande_status_enum_1 = require("./enums/demande-status.enum");
exports.DemandeStatusText = {
    [demande_status_enum_1.DemandeStatus.REJECTED]: 'Rejetée',
    [demande_status_enum_1.DemandeStatus.CANCELLED]: 'Annulée',
    [demande_status_enum_1.DemandeStatus.PAYED]: 'Remboursée',
    [demande_status_enum_1.DemandeStatus.VALIDATED]: 'Validée',
    [demande_status_enum_1.DemandeStatus.PENDING]: 'En cours',
};
exports.WaveFees = 1.65 / 100;
const WaveFee = (amount) => amount * exports.WaveFees;
exports.WaveFee = WaveFee;
//# sourceMappingURL=demande.utils.js.map