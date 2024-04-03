import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BeneficiaryService } from 'src/app/services/generalinformation/beneficiary.service';

@Component({
  selector: 'app-beneficiary',
  templateUrl: './beneficiary.component.html',
  styleUrls: ['./beneficiary.component.css'],
})
export class BeneficiaryComponent {
  form: FormGroup;
  formSubscription: Subscription;
  isIcon: boolean = true;
  isContinued = false;
  isLoading = false;
  constructor(
    private fb: FormBuilder,
    private formDataService: BeneficiaryService
  ) {}

  ngOnInit(): void {
    const existingFormData = this.formDataService.getFormData();

    this.form =
      existingFormData ||
      this.fb.group({
        /*one*/
        'NOM DU BÉNÉFICIAIRE 1': '',
        'PRÉNOM DU BÉNÉFICIAIRE 1': '',
        'LIEN AVEC LASSURÉ au Québec lien avec le propriétaire_1': '',
        selectOne: '',
        fill_1: '',
        /*two*/
        'NOM DU BÉNÉFICIAIRE 2': '',
        'PRÉNOM DU BÉNÉFICIAIRE 2': '',
        'LIEN AVEC LASSURÉ au Québec lien avec le propriétaire_2': '',
        selectTwo: '',
        fill_2: '',
        /*three*/
        'NOM DU BÉNÉFICIAIRE 3': '',
        'PRÉNOM DU BÉNÉFICIAIRE 3': '',
        'LIEN AVEC LASSURÉ au Québec lien avec le propriétaire_3': '',
        selectThree: '',
        fill_3: '',
        /*four*/
        'NOM DU BÉNÉFICIAIRE 4': '',
        'PRÉNOM DU BÉNÉFICIAIRE 4': '',
        'LIEN AVEC LASSURÉ au Québec lien avec le propriétaire_4': '',
        selectFour: '',
        /*five*/
        'NOM DU BÉNÉFICIAIRE 5': '',
        'PRÉNOM DU BÉNÉFICIAIRE 5': '',
        'LIEN AVEC LASSURÉ au Québec lien avec le propriétaire_5': '',
        selectFive: '',
        /*six*/
        'NOM DU BÉNÉFICIAIRE 6': '',
        'PRÉNOM DU BÉNÉFICIAIRE 6': '',
        'LIEN AVEC LASSURÉ au Québec lien avec le propriétaire_6': '',
        selectSix: '',
        /*seven*/
        'NOM DU BÉNÉFICIAIRE MINEUR': '',
        'PRÉNOM DU BÉNÉFICIAIRE MINEUR': '',
        'NOM COMPLET FIDUCIAIRE': '',
        'LIEN ASSURÉ': '',
        /*continue*/
        /*one*/
        'BÉNÉFICIAIRE SUBSIDIAIRE 1': '',
        'BÉNÉFICIAIRE SUBSIDIAIRE 1_2': '',
        'LIEN AVEC LASSURÉ bénéficiaire subsidiaire_1-2': '',
        selectConOne: '',
        /*tow*/
        'BÉNÉFICIAIRE SUBSIDIAIRE 2': '',
        'BÉNÉFICIAIRE SUBSIDIAIRE 2_2': '',
        'LIEN AVEC LASSURÉ bénéficiaire subsidiaire_2-2': '',
        selectConTwo: '',
        /*three*/
        'BÉNÉFICIAIRE SUBSIDIAIRE 3': '',
        'BÉNÉFICIAIRE SUBSIDIAIRE 3_2': '',
        'LIEN AVEC LASSURÉ bénéficiaire subsidiaire_3_2': '',
        selectConThree: '',
        /*four*/
        'BÉNÉFICIAIRE SUBSIDIAIRE 4': '',
        'BÉNÉFICIAIRE SUBSIDIAIRE 4_2': '',
        'LIEN AVEC LASSURÉ bénéficiaire subsidiaire_4-2': '',
        selectConFour: '',
      });

    this.formSubscription = this.form.valueChanges.subscribe((data) => {
      this.formDataService.setFormData(this.form);
    });
  }

  selectOne(e: any): void {
    const selectedPremiun = e.target.value;

    switch (selectedPremiun) {
      case 'Revocable_1':
        this.form.removeControl('Irrevocable_1');
        this.form.addControl('Revocable_1', this.fb.control(selectedPremiun));
        break;
      case 'Irrevocable_1':
        this.form.removeControl('Revocable_1');

        this.form.addControl('Irrevocable_1', this.fb.control(selectedPremiun));
        break;

      case '':
        this.form.removeControl('Revocable_1');
        this.form.removeControl('Irrevocable_1');
        break;
      default:
    }
  }

  selectTwo(e: any): void {
    const selectedPremiun = e.target.value;

    switch (selectedPremiun) {
      case 'Revocable_2':
        this.form.removeControl('Irrevocable_2');
        this.form.addControl('Revocable_2', this.fb.control(selectedPremiun));
        break;
      case 'Irrevocable_2':
        this.form.removeControl('Revocable_2');

        this.form.addControl('Irrevocable_2', this.fb.control(selectedPremiun));
        break;

      case '':
        this.form.removeControl('Revocable_2');
        this.form.removeControl('Irrevocable_2');
        break;
      default:
    }
  }
  selectThree(e: any): void {
    const selectedPremiun = e.target.value;

    switch (selectedPremiun) {
      case 'Revocable_3':
        this.form.removeControl('Irrevocable_3');
        this.form.addControl('Revocable_3', this.fb.control(selectedPremiun));
        break;
      case 'Irrevocable_3':
        this.form.removeControl('Revocable_3');
        this.form.addControl('Irrevocable_3', this.fb.control(selectedPremiun));
        break;

      case '':
        this.form.removeControl('Revocable_3');
        this.form.removeControl('Irrevocable_3');
        break;
      default:
    }
    console.log(this.form.value);
  }
  selectFour(e: any): void {
    const selectedPremiun = e.target.value;

    switch (selectedPremiun) {
      case 'Revocable_4':
        this.form.removeControl('Irrevocable_4');
        this.form.addControl('Revocable_4', this.fb.control(selectedPremiun));
        break;
      case 'Irrevocable_4':
        this.form.removeControl('Revocable_4');
        this.form.addControl('Irrevocable_4', this.fb.control(selectedPremiun));
        break;

      case '':
        this.form.removeControl('Revocable_4');
        this.form.removeControl('Irrevocable_4');
        break;
      default:
    }
  }
  selectFive(e: any): void {
    const selectedPremiun = e.target.value;

    switch (selectedPremiun) {
      case 'Revocable_5':
        this.form.removeControl('Irrevocable_5');
        this.form.addControl('Revocable_5', this.fb.control(selectedPremiun));
        break;
      case 'Irrevocable_5':
        this.form.removeControl('Revocable_5');
        this.form.addControl('Irrevocable_5', this.fb.control(selectedPremiun));
        break;

      case '':
        this.form.removeControl('Revocable_5');
        this.form.removeControl('Irrevocable_5');
        break;
      default:
    }
  }
  selectSix(e: any): void {
    const selectedPremiun = e.target.value;

    switch (selectedPremiun) {
      case 'Revocable_6':
        this.form.removeControl('Irrevocable_6');
        this.form.addControl('Revocable_6', this.fb.control(selectedPremiun));
        break;
      case 'Irrevocable_6':
        this.form.removeControl('Revocable_6');
        this.form.addControl('Irrevocable_6', this.fb.control(selectedPremiun));
        break;

      case '':
        this.form.removeControl('Revocable_6');
        this.form.removeControl('Irrevocable_6');
        break;
      default:
    }
  }

  /** continue **/
  handleContinue() {
    this.isLoading = true;
    this.isIcon = false;
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
    setTimeout(() => {
      this.isContinued = true;
    }, 500);
  }

  selectOneC(e: any): void {
    const selectedPremiun = e.target.value;

    switch (selectedPremiun) {
      case 'Beneficiaire_AVENANT_REVOCABLE':
        this.form.removeControl('Beneficiaire_AVENANT_Irrevocable');
        this.form.addControl(
          'Beneficiaire_AVENANT_REVOCABLE',
          this.fb.control(selectedPremiun)
        );
        break;
      case 'Beneficiaire_AVENANT_Irrevocable':
        this.form.removeControl('Beneficiaire_AVENANT_REVOCABLE');

        this.form.addControl(
          'Beneficiaire_AVENANT_Irrevocable',
          this.fb.control(selectedPremiun)
        );
        break;

      case '':
        this.form.removeControl('Beneficiaire_AVENANT_REVOCABLE');
        this.form.removeControl('Beneficiaire_AVENANT_Irrevocable');
        break;
      default:
    }
  }

  selectTwoC(e: any): void {
    const selectedPremiun = e.target.value;

    switch (selectedPremiun) {
      case 'Revocable_13':
        this.form.removeControl('Irrevocable_13');
        this.form.addControl('Revocable_13', this.fb.control(selectedPremiun));
        break;
      case 'Irrevocable_13':
        this.form.removeControl('Revocable_13');

        this.form.addControl(
          'Irrevocable_13',
          this.fb.control(selectedPremiun)
        );
        break;

      case '':
        this.form.removeControl('Revocable_13');
        this.form.removeControl('Irrevocable_13');
        break;
      default:
    }
  }
  selectThreeC(e: any): void {
    const selectedPremiun = e.target.value;

    switch (selectedPremiun) {
      case 'Revocable_14':
        this.form.removeControl('Irrevocable_14');
        this.form.addControl('Revocable_14', this.fb.control(selectedPremiun));
        break;
      case 'Irrevocable_14':
        this.form.removeControl('Revocable_14');
        this.form.addControl(
          'Irrevocable_14',
          this.fb.control(selectedPremiun)
        );
        break;

      case '':
        this.form.removeControl('Revocable_14');
        this.form.removeControl('Irrevocable_14');
        break;
      default:
    }
  }
  selectFourC(e: any): void {
    const selectedPremiun = e.target.value;

    switch (selectedPremiun) {
      case 'Revocable_15':
        this.form.removeControl('Irrevocable_15');
        this.form.addControl('Revocable_15', this.fb.control(selectedPremiun));
        break;
      case 'Irrevocable_15':
        this.form.removeControl('Revocable_15');
        this.form.addControl(
          'Irrevocable_15',
          this.fb.control(selectedPremiun)
        );
        break;

      case '':
        this.form.removeControl('Revocable_15');
        this.form.removeControl('Irrevocable_15');
        break;
      default:
    }
  }
  save() {
    // this.createPDF('john').then((res) => console.log(res));
    // this.formDataService.setFormData(this.form);
  }
  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }
}
