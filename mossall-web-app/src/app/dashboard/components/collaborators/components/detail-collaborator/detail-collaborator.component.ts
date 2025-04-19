import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom, map } from 'rxjs';
import { SnackBarService } from 'src/app/shared/services/snackbar.service';
import { dateToString } from 'src/app/shared/utils/time';
import {
  CancelDemandeByAdminGQL,
  DemandeStatus,
  FetchDemandesByCollaboratorGQL,
  FetchOrganizationCollaboratorGQL,
  FetchRemboursementByUserIdGQL,
  FetchRemboursementsByDemandeGQL,
  LockUserGQL,
  MyRemboursementsGQL,
  PayeDemandeGQL,
  RejectDemandeByAdminGQL,
  UnlockUserGQL,
  ValidateDemandeGQL,
} from 'src/graphql/generated';

@Component({
  selector: 'app-detail-collaborator',
  templateUrl: './detail-collaborator.component.html',
  styleUrl: './detail-collaborator.component.scss',
})
export class DetailCollaboratorComponent implements AfterViewInit {
  collaborator: any;
  collaboratorId: string;
  pendingDemandes: any[] = [];
  validatedDemandes: any[] = [];
  remboursements: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private fetchOrganizationCollaboratorGQL: FetchOrganizationCollaboratorGQL,
    private snackBarService: SnackBarService,
    private lockUserGQL: LockUserGQL,
    private unlockUserGQL: UnlockUserGQL,
    private fetchDemandeByCollaboratorIdGQL: FetchDemandesByCollaboratorGQL,
    private validateDemandeGQL: ValidateDemandeGQL,
    private payeDemandeGQL: PayeDemandeGQL,
    private cancelDemandeByAdminGQL: CancelDemandeByAdminGQL,
    private rejectDemandeByAdminGQL: RejectDemandeByAdminGQL,
    private requestService: MyRemboursementsGQL,
    private fetchDemandesByCollaboratorIdGQL: FetchRemboursementByUserIdGQL
  ) {
    this.route.paramMap.subscribe((params) => {
      this.collaboratorId = params.get('id');
      this.getCollab();
    });
  }
  ngAfterViewInit() {
    this.fetchDemandesByCollaboratorId(DemandeStatus.Pending);
    this.fetchDemandesByCollaboratorId(DemandeStatus.Validated);
    this.fetchRemboursments(this.collaboratorId);
  }
  fetchRemboursments(userId: string) {
    this.fetchDemandesByCollaboratorIdGQL
      .fetch({ userId: this.collaboratorId }, { fetchPolicy: 'no-cache' })
      .subscribe({
        next: (result) => {
          this.remboursements = result.data.fetchRemboursementByUserId;
        },
        error: (error) => {},
      });
  }
  getCollab() {
    if (this.collaboratorId) {
      this.fetchOrganizationCollaboratorGQL
        .fetch(
          { collaboratorId: this.collaboratorId },
          { fetchPolicy: 'no-cache' }
        )
        .subscribe((result) => {
          this.collaborator = result.data.fetchOrganizationCollaborator;
          const birthDate = dateToString(this.collaborator.birthDate);
        });
    }
  }

  lockUser = (userId: string) => {
    this.lockUserGQL.mutate({ userId }).subscribe((result) => {
      if (result.data.lockUser) {
        this.snackBarService.showSuccessSnackBar(
          'Utilisateur bloqué avec succès!'
        );
        this.getCollab();
      } else {
        this.snackBarService.showErrorSnackBar();
      }
    });
  };

  unlockUser = (userId: string) => {
    this.unlockUserGQL.mutate({ userId }).subscribe((result) => {
      if (result.data.unlockUser) {
        this.snackBarService.showSuccessSnackBar(
          'Utilisateur débloqué avec succès!'
        );
        this.getCollab();
      } else {
        this.snackBarService.showErrorSnackBar();
      }
    });
  };

  fetchDemandesByCollaboratorId(status: DemandeStatus) {
    this.fetchDemandeByCollaboratorIdGQL
      .fetch(
        { collaboratorId: this.collaboratorId, status },
        {
          fetchPolicy: 'no-cache',
        }
      )
      .pipe(
        map((result) => {
          if (result === null) {
            return [];
          }
          return result.data.fetchDemandesByCollaborator;
        })
      )
      .subscribe({
        next: (result) => {
          if (status === DemandeStatus.Pending) {
            this.pendingDemandes = result;
          }
          if (status === DemandeStatus.Validated) {
            this.validatedDemandes = result;
          }
          this.fetchRemboursments(this.collaboratorId);
        },
        error: (error) => {
          console.log(error);
          return [];
        },
      });
  }

  cancelDemande = (demandeId: string) => {
    this.cancelDemandeByAdminGQL.mutate({ demandeId }).subscribe(
      (result) => {
        if (result.data.cancelDemandeByAdmin) {
          this.snackBarService.showSuccessSnackBar(
            'demande annulée avec succés!'
          );
          this.fetchDemandesByCollaboratorId(DemandeStatus.Pending);
        } else {
          this.snackBarService.showErrorSnackBar();
        }
      },
      (error) => {
        this.snackBarService.showErrorSnackBar(
          5000,
          'Vous ne pouvez pas effectuer cette action.'
        );
      }
    );
  };

  rejectDemande = (demandeId: string, reason: string) => {
    this.rejectDemandeByAdminGQL
      .mutate({ demandeId, rejectedReason: reason })
      .subscribe(
        (result) => {
          if (result.data.rejectDemandeByAdmin) {
            this.snackBarService.showSuccessSnackBar(
              'demande rejetée avec succés!'
            );
            this.fetchDemandesByCollaboratorId(DemandeStatus.Pending);
          } else {
            this.snackBarService.showErrorSnackBar();
          }
        },
        (error) => {
          this.snackBarService.showErrorSnackBar(
            5000,
            'Vous ne pouvez pas effectuer cette action.'
          );
        }
      );
  };

  validateDemande = (demandeId: string) => {
    this.validateDemandeGQL.mutate({ demandeId }).subscribe(
      (result) => {
        if (result.data.validateDemande) {
          this.snackBarService.showSuccessSnackBar(
            'demande validée avec succés!'
          );
          this.fetchDemandesByCollaboratorId(DemandeStatus.Pending);
        } else {
          this.snackBarService.showErrorSnackBar();
        }
      },
      (error) => {
        this.snackBarService.showErrorSnackBar(
          5000,
          'Vous ne pouvez pas effectuer cette action.'
        );
      }
    );
  };

  payeDemande = (demandeId: string) => {
    this.payeDemandeGQL.mutate({ demandeId }).subscribe(
      (result) => {
        if (result.data.payeDemande) {
          this.snackBarService.showSuccessSnackBar(
            'demande payée avec succés!'
          );
          this.fetchDemandesByCollaboratorId(DemandeStatus.Pending);
        } else {
          this.snackBarService.showErrorSnackBar();
        }
      },
      (error) => {
        this.snackBarService.showErrorSnackBar(
          5000,
          'Vous ne pouvez pas effectuer cette action.'
        );
      }
    );
  };
}
