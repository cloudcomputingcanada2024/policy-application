import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BasicInformationService } from 'src/app/services/basic-information/basic-information.service';


@Component({
  selector: 'app-basic-information',
  templateUrl: './basic-information.component.html',
  styleUrls: ['./basic-information.component.css'],
})
export class BasicInformationComponent {
  form: FormGroup;
  formSubscription: Subscription;
  disable: boolean = false;
  btn_application: boolean = false;
  additionalPolicyNo: boolean = false;
  constructor(
    private fb: FormBuilder,
    private formDataService: BasicInformationService,
   
  ) {}
  policiesData = [
    {
      id: 0,
      name: 'N/A',
      disabled: false,
      value: 'N/A',
    },
    {
      id: 1,
      name: 'Addition of insured',
      p1: 'Not available for any universal life insurance policy',
      p2: 'Addition Policyowner : B1, B2, B3, B5, B7, C, D5, E, F, G, I, J, K, L, M, N, P and Q',
      p3: 'Critical illness insurance / Term insurance : B1, B2, B5, B7, C, D5, E, F, G, I, J, K, L, M, N, P and Q',
      p4: 'Whole life insurance / Enhanced term-100 life insurance : B1, B2, B4, B5, B7, C, D5, E, F, G, I, J, K, L, M, N, P and Q',
      p5: 'Child Rider / Children’s Endorsement : H',
      disabled: false,
      value: 'Case à cocher9',
    },
    {
      id: 2,
      name: 'Addition of benefit or additional benefit',
      p1: 'No addition available for a universal life insurance policy if the policy date is prior to January 1st 2017',
      p: 'The addition of term insurance benefits or critical illness insurance benefits on a universal life insurance policy is available only if the contract is individual.',
      p2: 'Addition Policyowner : B1, B2, B3, B5, B7, C, D5, E, F, I, J, K, L, M, N, P and Q',
      p3: 'Critical illness insurance / Term insurance : B1, B2, B5, B7, C, D5, E, F, I, J, K, L, M, N, P and Q',
      p4: 'Whole life insurance / Enhanced term-100 life insurance : B1, B2, B4, B5, B7, C, D5, E, F, I, J, K, L, M, N, P and Q',
      p5: 'Universal life insurance : B1, B2, B3, B3, B4, B5, B6, C, D5, E, F, I, J, K, L, M, N, P and Q',
      p6: 'Child Rider / Children’s Endorsement : H',
      disabled: false,
      value: 'Case à cocher10',
    },
    {
      id: 3,
      name: 'Revision of rating / Exclusion',
      p1: 'B1, B2, I, J, K, L, M, N, P and Q',
      disabled: false,
      value: 'Case à cocher13',
    },
    {
      id: 4,
      name: 'Revision of risk class (12 months after date of issue only)',
      p1: 'B1, B2, I, J, K, L, M, N, P and Q',
      disabled: false,
      value: 'Case à cocher14',
    },
    {
      id: 5,
      name: 'Change to non-smoker rate',
      p1: 'use the Non-smoker rates form (FIND0241A)',
      disabled: false,
      value: 'Case à cocher15',
    },
    {
      id: 6,
      name: 'Reinstatement',
      p1: 'use the Policy reinstatement form (FIND0117A)',
      disabled: false,
      value: 'Case à cocher16',
    },
  ];

  selectedPolicy = this.policiesData[1].name;

  ngOnInit(): void {
    const existingFormData = this.formDataService.getFormData();

    this.form =
      existingFormData ||
      this.fb.group({
        policies: new FormControl([]),
        applications: '',
        language: '',
        natureOfApplication: '',
        complete: '',
        partial: '',
        A1: '',
        A2: '',
        A3: '',
      });
    this.form.valueChanges.subscribe((selectedPolicy) => {
      this.policiesData.forEach((option, index) => {
        if (selectedPolicy?.policies[index] == 'N/A') {
          this.disable = true;
          this.form.get('policies').disable();
        }
      });
    });
    this.form.valueChanges.subscribe((selectedValue) => {
      Array.from([0, 1, 2]).forEach((option, index) => {
        if (selectedValue?.applications[index] == 'N/A') {
          this.btn_application = true;
          this.form.get('applications').disable();
        }
      });
    });
    this.formSubscription = this.form.valueChanges.subscribe((data) => {
      this.formDataService.setFormData(this.form);
    });
  }

  select_application(e: any) {
    let applications = this.form.get('applications').value;
    if (
      applications[0] === 'demande préliminaire' ||
      applications[1] === 'demande préliminaire'
    ) {
      this.form.addControl(
        'demande préliminaire',
        this.fb.control('demande préliminaire')
      );
      console.log('if part in demande');
    } else {
      this.form.removeControl('demande préliminaire');
      console.log('else part demande');
    }
    if (
      applications[0] == 'Nouvelle proposition' ||
      applications[1] == 'Nouvelle proposition'
    ) {
      this.form.addControl(
        'Nouvelle proposition',
        this.fb.control('Nouvelle proposition')
      );
      console.log('if part in Nouvelle');
    } else {
      this.form.removeControl('Nouvelle proposition');
      console.log('else part in Nouvelle');
    }
    if (typeof applications === 'undefined' || applications === null) {
      this.form.removeControl('demande préliminaire');
      this.form.removeControl('Nouvelle proposition');
      console.log('undefine part');
    }

    if (
      applications[0] == 'N/A' ||
      applications[1] == 'N/A' ||
      applications[2] == 'N/A'
    ) {
      this.btn_application = true;
      console.log('if part in n/a');
      this.form.removeControl('demande préliminaire');
      this.form.removeControl('Nouvelle proposition');
    }
  }
  enableSelect_application() {
    this.form.get('applications').setValue(null);
    this.form.get('applications').enable();
    this.btn_application = false;
  }

  selectLanguage(e: any) {
    const selectedLanguage = this.form.get('language').value;

    switch (selectedLanguage) {
      case 'LANGUE':
        this.form.removeControl('LANGUE1');
        this.form.addControl('LANGUE', this.fb.control(selectedLanguage));
        break;
      case 'LANGUE1':
        this.form.removeControl('LANGUE');
        this.form.addControl('LANGUE1', this.fb.control(selectedLanguage));
        break;
      case '':
        this.form.removeControl('LANGUE');
        this.form.removeControl('LANGUE1');
        break;
      default:
    }
  }

  selectNatureApplication(e: any): void {
    const selectedApplication = e.target.value;
    if (selectedApplication == 'PRINCIPALE1') {
      this.additionalPolicyNo = true;
    } else {
      this.additionalPolicyNo = false;
    }
    switch (selectedApplication) {
      case 'PRINCIPALE':
        this.form.removeControl('PRINCIPALE1');
        this.form.addControl(
          'PRINCIPALE',
          this.fb.control(selectedApplication)
        );
        break;
      case 'PRINCIPALE1':
        this.form.removeControl('PRINCIPALE');
        this.form.addControl(
          'PRINCIPALE1',
          this.fb.control(selectedApplication)
        );
        break;
      case '':
        this.form.removeControl('PRINCIPALE1');
        this.form.removeControl('PRINCIPALE');
        break;
      default:
    }
  }
  selectComplete(e: any): void {
    const selectedComplete = e.target.value;

    switch (selectedComplete) {
      case 'ANNULATION_INTEGRAL_OUI_NON_y':
        this.form.removeControl('ANNULATION_INTEGRAL_OUI_NON_n');
        this.form.addControl(
          'ANNULATION_INTEGRAL_OUI_NON_y',
          this.fb.control(selectedComplete)
        );
        break;
      case 'ANNULATION_INTEGRAL_OUI_NON_n':
        this.form.removeControl('ANNULATION_INTEGRAL_OUI_NON_y');
        this.form.addControl(
          'ANNULATION_INTEGRAL_OUI_NON_n',
          this.fb.control(selectedComplete)
        );
        break;
      case '':
        this.form.removeControl('ANNULATION_INTEGRAL_OUI_NON_y');
        this.form.removeControl('ANNULATION_INTEGRAL_OUI_NON_n');
        break;
      default:
    }
  }
  selectPartial(e: any): void {
    const selectedPartial = e.target.value;

    switch (selectedPartial) {
      case 'ANNULATION_PARTIEL_OUI_NON_y':
        this.form.removeControl('ANNULATION_PARTIEL_OUI_NON_n');
        this.form.addControl(
          'ANNULATION_PARTIEL_OUI_NON_y',
          this.fb.control(selectedPartial)
        );
        break;
      case 'ANNULATION_PARTIEL_OUI_NON_n':
        this.form.removeControl('ANNULATION_PARTIEL_OUI_NON_y');
        this.form.addControl(
          'ANNULATION_PARTIEL_OUI_NON_n',
          this.fb.control(selectedPartial)
        );
        break;
      case '':
        this.form.removeControl('ANNULATION_PARTIEL_OUI_NON_y');
        this.form.removeControl('ANNULATION_PARTIEL_OUI_NON_n');
        break;
      default:
    }
  }

  selectPolicy(e: any) {
    let selectedPolicy = this.form.get('policies').value;

    let case_a_cocher9 = selectedPolicy[0] != 'Case à cocher9';
    let case_a_cocher10 = selectedPolicy[0] != 'Case à cocher10';
    let case_a_cocher13 = selectedPolicy[0] != 'Case à cocher13';
    let case_a_cocher14 = selectedPolicy[0] != 'Case à cocher14';
    let case_a_cocher15 = selectedPolicy[0] != 'Case à cocher15';
    let case_a_cocher16 = selectedPolicy[0] != 'Case à cocher16';

    selectedPolicy.forEach((option, index) => {
      console.log(selectedPolicy[index] != 'Case à cocher9');

      if (selectedPolicy[index] != 'Case à cocher9') {
        this.form.removeControl('Case à cocher9');
        console.log('if part in Case à cocher9');
      }
      if (selectedPolicy[index] != 'Case à cocher10') {
        this.form.removeControl('Case à cocher10');
        console.log('if part in Case à cocher10');
      }
      if (selectedPolicy[index] !== 'Case à cocher13') {
        this.form.removeControl('Case à cocher13');
        console.log('if part in Case à cocher13');
      }
      if (selectedPolicy[index] !== 'Case à cocher14') {
        this.form.removeControl('Case à cocher14');
        console.log('if part in Case à cocher14');
      }
      if (selectedPolicy[index] !== 'Case à cocher15') {
        this.form.removeControl('Case à cocher15');
        console.log('if part in Case à cocher15');
      }
      if (selectedPolicy[index] !== 'Case à cocher16') {
        this.form.removeControl('Case à cocher16');
        console.log('if part in Case à cocher16');
      }
    });

    if (case_a_cocher9) {
      this.form.removeControl('Case à cocher9');
      console.log('case_a_cocher9 if part');
    }
    if (case_a_cocher10) {
      this.form.removeControl('Case à coche10');
      console.log('case_a_cocher10 if part');
    }
    if (case_a_cocher13) {
      this.form.removeControl('Case à cocher13');
      console.log('case_a_cocher13 if part');
    }
    if (case_a_cocher14) {
      this.form.removeControl('Case à cocher14');
      console.log('case_a_cocher14 if part');
    }
    if (case_a_cocher15) {
      this.form.removeControl('Case à cocher15');
      console.log('case_a_cocher15 if part');
    }
    if (case_a_cocher16) {
      this.form.removeControl('Case à cocher16');
      console.log('case_a_cocher16 if part');
    }
    selectedPolicy.forEach((option, index) => {
      if (selectedPolicy[index] === 'Case à cocher9') {
        this.form.addControl('Case à cocher9', this.fb.control(option));
        console.log('if part in Case à cocher9');
      }
      if (selectedPolicy[index] === 'Case à cocher10') {
        this.form.addControl('Case à cocher10', this.fb.control(option));
        console.log('if part in Case à cocher10');
      }
      if (selectedPolicy[index] === 'Case à cocher13') {
        this.form.addControl('Case à cocher13', this.fb.control(option));
        console.log('if part in Case à cocher13');
      }
      if (selectedPolicy[index] === 'Case à cocher14') {
        this.form.addControl('Case à cocher14', this.fb.control(option));
        console.log('if part in Case à cocher14');
      }
      if (selectedPolicy[index] === 'Case à cocher15') {
        this.form.addControl('Case à cocher15', this.fb.control(option));
        console.log('if part in Case à cocher15');
      }
      if (selectedPolicy[index] === 'Case à cocher16') {
        this.form.addControl('Case à cocher16', this.fb.control(option));
        console.log('if part in Case à cocher16');
      }
    });

    selectedPolicy.forEach((option, index) => {
      if (selectedPolicy[index] == 'N/A') {
        this.form.removeControl('Case à cocher9');
        this.form.removeControl('Case à cocher10');
        this.form.removeControl('Case à cocher13');
        this.form.removeControl('Case à cocher14');
        this.form.removeControl('Case à cocher15');
        this.form.removeControl('Case à cocher16');
      }
    });
  }
  enableSelect_policy() {
    this.form.get('policies').setValue([]);
    this.form.get('policies').enable();
    this.disable = false;
  }

  save() {
    // this.formDataService.setFormData(this.form);
    console.log(this.form.value);
  }
  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }
}
