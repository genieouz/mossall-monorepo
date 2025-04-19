import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { lastValueFrom } from 'rxjs';
import { SnackBarService } from 'src/app/shared/services/snackbar.service';
import {
  AmountUnit,
  CategorySociopro,
  CategorySocioproService,
  CreateCategorySocioproServiceGQL,
  CreateOrganistionServiceGQL,
  DurationUnit,
  FetchCategorySocioprosGQL,
  FetchCurrentAdminGQL,
  FetchOrganisationServiceByOrganisationIdAndServiceIdGQL,
  OrganisationServiceInput,
  OrganisationServiceUpdateInput,
  Organization,
  Service,
  UpdateCategorySocioproServiceGQL,
  UpdateOrganisationServiceGQL,
} from 'src/graphql/generated';
import Swal from 'sweetalert2';
import { differenceInMonths, differenceInDays } from 'date-fns';
import { ActivationService } from '../organization/activation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-organization-setting-salary',
  templateUrl: './organization-setting-salary.component.html',
  styleUrl: './organization-setting-salary.component.scss',
})
export class OrganizationSettingSalaryComponent {
  startDate: Date;
  endDate: Date;
  isPercentage: boolean = true;
  categories: Partial<CategorySociopro & { error: boolean }>[] = [];
  listCategorieService: Partial<CategorySocioproService>[] = [];
  formDate: FormGroup;
  newCategory: string = '';
  isActive: boolean = false;
  organization: Organization;
  organisationServiceId: string;
  activated: boolean = true;
  selectedCategorie: any;
  selectedCategorieId: string;
  validDate: boolean = true;
  dataForm: any;
  disableButton: boolean = false; // Par défaut, le bouton de sauvegarde est désactivé

  @Output() activeService: EventEmitter<{
    isActive: boolean;
    organisationServiceId: string;
  }> = new EventEmitter();
  @Input() service: Partial<Service>;
  constructor(
    private updateService: UpdateOrganisationServiceGQL,

    private listCategorieGQL: FetchCategorySocioprosGQL,
    private defineService: CreateOrganistionServiceGQL,
    private snackBarService: SnackBarService,
    private fetchCurrentAdminGQL: FetchCurrentAdminGQL,
    private updateCategorySocioproServiceGQL: UpdateCategorySocioproServiceGQL,
    private createCategorySocioproServiceGQL: CreateCategorySocioproServiceGQL,
    private activationInformationService: ActivationService,
    private organizationService: FetchOrganisationServiceByOrganisationIdAndServiceIdGQL,
    private formBuilder: FormBuilder
  ) {
    this.formDate = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
    this.formDate.valueChanges.subscribe((value) => {
      console.log('value', value);

      if (this.formDate.valid) {
        this.calculateRefundDuration(value.startDate, value.endDate);
      }
    });
  }
  get dateStart() {
    return this.formDate.get('startDate');
  }
  get dateEnd() {
    return this.formDate.get('endDate');
  }
  async ngOnInit() {
    this.organization = (await lastValueFrom(this.fetchCurrentAdminGQL.fetch()))
      .data.fetchCurrentAdmin.organization as Organization;
    this.organizationService
      .fetch(
        {
          organisationId: this.organization.id,
          serviceId: this.service.id,
        },
        { fetchPolicy: 'no-cache' }
      )
      .subscribe({
        next: (response) => {
          if (
            response.data.fetchOrganisationServiceByOrganisationIdAndServiceId
          ) {
            const data = response.data
              ?.fetchOrganisationServiceByOrganisationIdAndServiceId as any;
            this.organisationServiceId = data?.id;
            this.dataForm = data;
            this.activated = data?.activated;
            if (data.activatedAt) {
              this.dateStart.setValue(new Date(data?.activatedAt));
              this.dateEnd.setValue(
                new Date(
                  new Date(data?.activatedAt).getTime() +
                    data?.activationDurationDay * 24 * 60 * 60 * 1000
                )
              );
              console.log('dateEnd', this.dateEnd.value);
            }

            this.listCategorieService = [
              {
                amount: data.amount,
                amountUnit: data.amountUnit,
                refundDuration: data.refundDuration,
                refundDurationUnit: data.refundDurationUnit,
                activated: data.activated,
                activatedAt: data.activatedAt,
                autoValidate: data.autoValidate,
                categorySociopro: {
                  title: 'Paramètres généraux',
                } as any,
              },
            ];
            this.listCategorieService = [
              ...this.listCategorieService,
              ...(data?.categoriesocioproservices || []),
            ];
          } else {
            this.activated = true;
            this.listCategorieService = [
              {
                amount: 0,
                amountUnit: AmountUnit.Fixed,
                refundDuration: 1,
                refundDurationUnit: DurationUnit.Month,
                activated: true,
                activatedAt: null,
                autoValidate: true,
                categorySociopro: {
                  title: 'Paramètres généraux',
                } as any,
              },
            ];
          }
          this.selectedCategorie = this.listCategorieService[0];
        },
        error: (err) => {
          console.log(err);
        },
      });
    this.listCategorieGQL
      .fetch(
        {
          queryConfig: {
            limit: 10,
          },
        },
        {
          fetchPolicy: 'no-cache',
        }
      )
      .subscribe({
        next: (resp) => {
          this.categories = resp.data.fetchCategorySociopros.results;
          this.categories = [...this.categories];
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  onDateChange($event: Event) {
    if (this.startDate && this.endDate) {
      this.calculateRefundDuration(this.startDate, this.endDate);
    }
  }

  onChangeCategorie(event: Event) {
    const temp = [...this.listCategorieService];
    const cate = this.categories.find(
      (item) => item?.id == this.selectedCategorieId
    );
    if (
      this.listCategorieService.some(
        (item) => item.categorySociopro?.title === cate.title
      )
    ) {
      this.snackBarService.showSnackBar('Cette catégorie est déjà ajoutée');
      return;
    }
    temp.push({
      activated: true,
      amount: 0,
      amountUnit: AmountUnit.Fixed,
      autoValidate: true,
      organisationServiceId: this.organisationServiceId,
      categorySocioproId:
        this.categories.find((item) => item?.id == this.selectedCategorieId)
          ?.id || '',
      categorySociopro: this.categories.find(
        (item) => item?.id == this.selectedCategorieId
      ),
      refundDuration: 1,
      refundDurationUnit: DurationUnit.Month,
      activatedAt: null,
    } as any);
    console.log(temp);

    this.listCategorieService = temp;
  }

  calculateRefundDuration(startDate: Date, endDate: Date) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    this.dataForm = {
      ...this.dataForm,
      activatedAt: start.toISOString(),
    };
    if (start <= end) {
      const duration = differenceInDays(end, start);

      // approximate month difference
      this.dataForm['activationDurationDay'] = duration;
      this.validDate = true;
    } else {
      this.validDate = false;
      this.dataForm['activationDurationDay'] = 0;
    }
  }

  handleServiceActivationChange(isActive: boolean) {
    this.isActive = isActive;
    this.activated = isActive;
    if (this.organisationServiceId) {
      this.activeService.emit({
        isActive,
        organisationServiceId: this.organisationServiceId,
      });
    } else {
      this.activated = true;
      Swal.fire({
        title: 'Veuillez enregistrer les paramètres avant d activer le service',
        showCancelButton: false,
      });
    }
    this.activationInformationService.setActivationState(
      this.service.id,
      isActive
    );
  }

  saveSettings() {
    // if (this.salaryForm.invalid) {
    //   return;
    // }
    Swal.fire({
      title: 'Voulez-vous enregistrer les modifications?',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('dataForm', this.dataForm);

        // delete this.dataForm.selectedCategory;
        // delete this.dataForm.startDate;
        // delete this.dataForm.endDate;
        // delete this.dataForm.__typename;
        let {
          selectedCategory,
          startDate,
          endDate,
          __typename,
          organizationId,
          serviceId,
          amountPercentage,
          categoriesocioproservices,
          events,
          service,
          organization,
          id,

          ...dataForm
        } = this.dataForm;
        this.dataForm = dataForm;

        // delete this.dataForm?.id;
        //   console.log(this.selectedCategorie);
        if (
          this.selectedCategorie.categorySociopro.title == 'Paramètres généraux'
        ) {
          if (this.organisationServiceId) {
            this.updateOrganisationService(
              this.organisationServiceId,
              this.dataForm
            );
          } else {
            this.createOrganisationService(
              this.dataForm,
              this.organization.id,
              this.service.id
            );
          }
        } else {
          delete this.dataForm?.activatedAt;
          delete this.dataForm?.activationDurationDay;
          let selectedUpdate = this.listCategorieService.find(
            (item) =>
              item?.id === this.selectedCategorie?.id &&
              item?.id &&
              this.selectedCategorie?.id
          );
          if (!selectedUpdate) {
            console.log('dataForm', this.dataForm);

            this.createCategorySocioproServiceGQL
              .mutate({
                categorySocioproId: this.selectedCategorie.categorySocioproId,
                categorySocioproServiceInput: {
                  ...this.dataForm,
                },
                organisationServiceId: this.organisationServiceId,
              })
              .subscribe({
                next: (response) => {
                  this.snackBarService.showSnackBar(
                    `Nouvelles Paramètragres de plafond enregistrés sur le service ${this.selectedCategorie.categorySociopro?.title}`
                  );
                },
                error: (err) => {
                  this.snackBarService.showSnackBar(
                    "Une erreur est survenue lors de l'enregistrement des paramètres de plafond"
                  );
                },
              });
          } else {
            this.updateCategorySocioproServiceGQL
              .mutate({
                categorySocioproServiceId: selectedUpdate.id,
                categorySocioproServiceInput: {
                  ...this.dataForm,
                },
              })
              .subscribe({
                next: (response) => {
                  this.snackBarService.showSnackBar('Paramètres enregistrés');
                },
                error: (err) => {
                  this.snackBarService.showSnackBar(
                    'Une configuration est deja mise en place'
                  );
                },
              });
          }
        }
      }
    });
  }
  createOrganisationService(
    organisationServiceInput: OrganisationServiceInput,
    organisationId: string,
    serviceId: string
  ) {
    this.defineService
      .mutate({
        organisationId,
        serviceId,
        organisationServiceInput,
      })
      .subscribe({
        next: (response) => {
          console.log('response', response);
          this.snackBarService.showSnackBar(
            'Paramètres de plafond enregistrés'
          );
        },
        error: (err) => {
          console.log(err);
          this.snackBarService.showSnackBar(
            "Une erreur est survenue lors de l'enregistrement des paramètres de plafond"
          );
        },
      });
  }
  updateOrganisationService(
    organisationServiceId: string,
    organisationServiceInput: OrganisationServiceUpdateInput
  ) {
    this.updateService
      .mutate({
        organisationServiceId,
        organisationServiceInput,
      })
      .subscribe({
        next: (response) => {
          console.log('response', response);
          this.snackBarService.showSnackBar(
            'Paramètres de plafond enregistrés'
          );
        },
        error: (err) => {
          console.log(err);
          this.snackBarService.showSnackBar(
            "Une erreur est survenue lors de l'enregistrement des paramètres de plafond"
          );
        },
      });
  }
  onSettingChange(event: any) {
    this.disableButton = false;
    if (event.saveData) {
      this.disableButton = true;
      const tempForm = event?.dataForm;
      this.dataForm = { ...this.dataForm, ...tempForm };
    }

    console.log('dataForm', this.dataForm);
  }
  onTabChange(event: MatTabChangeEvent) {
    this.selectedCategorie = this.listCategorieService[event.index];
  }
}
