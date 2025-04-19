import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { SearchService } from 'src/app/shared/services/search/search.service';
import { SnackBarService } from 'src/app/shared/services/snackbar.service';
import { dateToString } from 'src/app/shared/utils/time';
import {
  FetchOrganizationCollaboratorGQL,
  InviteCollaboratorGQL,
  LockUserGQL,
  UnlockUserGQL,
  UpdateCollaboratorGQL,
  User,
  Wallet,
} from 'src/graphql/generated';

@Component({
  selector: 'app-form-collaborator',
  templateUrl: './form-collaborator.component.html',
  styleUrls: ['./form-collaborator.component.scss'],
})
export class FormCollaboratorComponent implements OnInit, OnChanges {
  @Input() formType: string;
  formText: string = '';
  collaboratorForm: FormGroup;
  collaborator: User;
  @Input() collaboratorId: string;
  isLoading: boolean = false;
  phoneNumberExists: boolean = false;
  bankAccountNumberExists: boolean = false;
  uniqueIdentifierExists: boolean = false;
  emailExists: boolean = false;
  MobileMoney = Object.values(Wallet);

  constructor(
    private fb: FormBuilder,
    private inviteCollaboratorGQL: InviteCollaboratorGQL,
    private router: Router,
    private snackBarService: SnackBarService,
    private fetchOrganizationCollaboratorGQL: FetchOrganizationCollaboratorGQL,
    private updateCollaboratorGQL: UpdateCollaboratorGQL,
    private searchService: SearchService,
    private lockUserGQL: LockUserGQL,
    private unlockUserGQL: UnlockUserGQL
  ) {
    this.collaboratorForm = this.fb.group({
      email: ['', [Validators.required]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^(78|77|76|70|75)\d{7}$/)],
      ],
      address: [''],
      position: ['', Validators.required],
      uniqueIdentifier: ['', Validators.required],
      salary: [500000, [Validators.required, Validators.min(50000)]],
      wizallAccountNumber: [''],
      bankAccountNumber: ['', Validators.required],
      birthDate: [null],
      favoriteWallet: [Wallet.Wave],
    });
  }

  get phoneNumber() {
    return this.collaboratorForm.controls['phoneNumber'];
  }

  get salary() {
    return this.collaboratorForm.get('salary');
  }

  ngOnInit(): void {
    this.formText =
      this.formType == 'edit'
        ? 'Modifier les infos du collaborateur '
        : 'Création compte collaborateur';
    this.initSearch();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getCollab();
    if (this.formType == 'edit') {
      this.collaboratorForm.controls['email'].disable();
    }
  }

  // Méthode pour soumettre le formulaire
  submitForm() {
    if (this.collaboratorForm.invalid || this.isLoading || this.hasErrors) {
      this.collaboratorForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    this.inviteCollaboratorGQL
      .mutate({ collaboratorInput: this.collaboratorForm.value })
      .subscribe(
        (result) => {
          this.isLoading = false;
          if (result.data) {
            this.router.navigate(['/dashboard/collaborators']);
            this.snackBarService.showSuccessSnackBar(
              'Invitation envoyé au collaborateur'
            );
          }
        },
        (error) => {
          this.isLoading = false;
        }
      );
  }

  edit() {
    if (this.collaboratorForm.invalid || this.isLoading) {
      this.collaboratorForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    const value = {
      ...this.collaboratorForm.value,
      salary: Number(this.collaboratorForm.value.salary || 0),
    };
    delete value.email;
    this.updateCollaboratorGQL
      .mutate({ collaboratorInput: value, collaboratorId: this.collaboratorId })
      .subscribe(
        (result) => {
          this.isLoading = false;
          if (result.data) {
            this.router.navigate(['/dashboard/collaborators']);
            this.snackBarService.showSuccessSnackBar(
              'Collaborator modifié avec succés'
            );
          }
        },
        (error) => {
          this.isLoading = false;
        }
      );
  }

  getCollab() {
    if (this.collaboratorId) {
      this.fetchOrganizationCollaboratorGQL
        .fetch(
          { collaboratorId: this.collaboratorId },
          { fetchPolicy: 'no-cache' }
        )
        .subscribe((result) => {
          this.collaborator = result.data.fetchOrganizationCollaborator as User;
          const birthDate = dateToString(this.collaborator.birthDate);
          this.collaboratorForm.patchValue({ ...this.collaborator, birthDate });
        });
    }
  }

  checkPhone() {
    this.collaboratorForm
      .get('phoneNumber')
      .valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((value) =>
          this.searchService.phoneNumberExists(
            value,
            false,
            this.collaboratorId
          )
        )
      )
      .subscribe((result) => {
        this.phoneNumberExists = result;
      });
  }

  checkEmail() {
    this.collaboratorForm
      .get('email')
      .valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((value) =>
          this.searchService.emailExists(value, false, this.collaboratorId)
        )
      )
      .subscribe((result) => {
        this.emailExists = result;
      });
  }

  checkBankAccount() {
    this.collaboratorForm
      .get('bankAccountNumber')
      .valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((value) =>
          this.searchService.bankAccountNumberExists(
            value,
            false,
            this.collaboratorId
          )
        )
      )
      .subscribe((result) => {
        this.bankAccountNumberExists = result;
      });
  }

  checkUniqueIdentifier() {
    this.collaboratorForm
      .get('uniqueIdentifier')
      .valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((value) =>
          this.searchService.uniqueIdentifierExists(
            value,
            false,
            this.collaboratorId
          )
        )
      )
      .subscribe((result) => {
        this.uniqueIdentifierExists = result;
      });
  }

  initSearch() {
    this.checkPhone();
    this.checkBankAccount();
    this.checkUniqueIdentifier();
    this.checkEmail();
  }

  get hasErrors() {
    return (
      this.bankAccountNumberExists ||
      this.phoneNumberExists ||
      this.uniqueIdentifierExists ||
      this.emailExists
    );
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
}
