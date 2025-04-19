import { DemandeStatus } from "../enums/demande-status.enum";
export declare class DemandesMetricsInput {
    startDate: Date;
    endDate: Date;
    minimum?: number;
    maximum?: number;
    status?: DemandeStatus;
}
