import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PolicyownerService } from 'src/app/services/generalinformation/policyowner.service';

@Component({
  selector: 'app-policyowner',
  templateUrl: './policyowner.component.html',
  styleUrls: ['./policyowner.component.css'],
})
export class PolicyownerComponent {
  form: FormGroup;
  formSubscription: Subscription;
  disableBtn: boolean = false;
  constructor(
    private fb: FormBuilder,
    private formDataService: PolicyownerService
  ) {}

  insuredData = [
    {
      id: 0,
      name: 'N/A',
      disabled: false,
      value: 'N/A',
    },
    {
      id: 1,
      name: 'Insured 1',
      disabled: false,
      value: 'Propriétaire_0',
    },
    {
      id: 2,
      name: 'Insured 2',
      disabled: false,
      value: 'Propriétaire_1',
    },
    {
      id: 3,
      name: 'A distinct policy will be issued for insured 1 and insured 2. Each insured will be the sole policyowner.',
      disabled: false,
      value: 'Propriétaire_3',
    },
    {
      id: 4,
      name: 'Other if a policyowner is not one of the insureds, provide the information requested below.',
      disabled: false,
      value: 'Propriétaire_4',
    },
  ];

  selectedInsured = this.insuredData[1].name;
  ngOnInit(): void {
    const existingFormData = this.formDataService.getFormData();

    this.form =
      existingFormData ||
      this.fb.group({
        insured: '',
        'PRÉNOM ET NOM OU DÉNOMINATION SOCIALE SI PERSONNE MORALE OU AUTRE ENTITÉ':
          '',
        'LIEN AVEC LASSURÉ': '',
        'NUMÉRO DENTREPRISE sil y a lieu': '',
        ADRESSE: '',
        TÉLÉPHONE: '',
        PROFESSION: '',
        "Nom de l'employeur 1": '',
        "Statut d'emploi 1": '',
        'LIEU DE NAISSANCE': '',
        ÂGE_3: '',
        gender: '',
        'PRÉNOM ET NOM DU PROPRIÉTAIRE SUBSIDIAIRESUCCESSEUR 1': '',
        'LIEN AVEC LASSURÉ_3': '',
        dob: '',
        dobAge: '',
        dobRel: '',
      });

    this.formSubscription = this.form.valueChanges.subscribe((data) => {
      this.formDataService.setFormData(this.form);
    });

    this.form.valueChanges.subscribe((selectedInsured) => {
      this.insuredData.forEach((option, index) => {
        if (selectedInsured?.insured[index] == 'N/A') {
          this.form.get('insured').disable();
          this.disableBtn = true;
        }
      });
    });

    this.formSubscription = this.form
      .get('dobAge')
      .valueChanges.subscribe((date) => {
        this.updateAge(date);
      });
  }

  selectInsured(e: any): void {
    let selectedInsured = this.form.get('insured').value;
    console.log('selectedInsured', selectedInsured);

    let insured_0 = selectedInsured[0] != 'Propriétaire_0';
    let insured_1 = selectedInsured[0] != 'Propriétaire_1';
    let insured_3 = selectedInsured[0] != 'Propriétaire_3';
    let insured_4 = selectedInsured[0] != 'Propriétaire_4';

    selectedInsured.forEach((option, index) => {
      if (selectedInsured[index] != 'Propriétaire_0') {
        this.form.removeControl('Propriétaire_0');
      }
      if (selectedInsured[index] != 'Propriétaire_1') {
        this.form.removeControl('Propriétaire_1');
      }
      if (selectedInsured[index] !== 'Propriétaire_3') {
        this.form.removeControl('Propriétaire_3');
      }
      if (selectedInsured[index] !== 'Propriétaire_4') {
        this.form.removeControl('Propriétaire_4');
      }
    });

    if (insured_0) {
      this.form.removeControl('Propriétaire_0');
    }
    if (insured_1) {
      this.form.removeControl('Propriétaire_1');
      console.log('case_a_cocher10 if part');
    }
    if (insured_3) {
      this.form.removeControl('Propriétaire_3');
    }
    if (insured_4) {
      this.form.removeControl('Propriétaire_4');
    }

    selectedInsured.forEach((option, index) => {
      if (selectedInsured[index] === 'Propriétaire_0') {
        this.form.addControl('Propriétaire_0', this.fb.control(option));
        console.log('if part in Propriétaire_0');
      }
      if (selectedInsured[index] === 'Propriétaire_1') {
        this.form.addControl('Propriétaire_1', this.fb.control(option));
        console.log('if part in Propriétaire_1');
      }
      if (selectedInsured[index] === 'Propriétaire_3') {
        this.form.addControl('Propriétaire_3', this.fb.control(option));
        console.log('if part in Propriétaire_3');
      }
      if (selectedInsured[index] === 'Propriétaire_4') {
        this.form.addControl('Propriétaire_4', this.fb.control(option));
        console.log('if part in Propriétaire_4');
      }
    });

    selectedInsured.forEach((option, index) => {
      if (selectedInsured[index] == 'N/A') {
        this.form.removeControl('Propriétaire_0');
        this.form.removeControl('Propriétaire_1');
        this.form.removeControl('Propriétaire_3');
        this.form.removeControl('Propriétaire_4');
      }
    });
  }

  enableBtn() {
    this.form.get('insured').setValue([]);
    this.form.get('insured').enable();
    this.disableBtn = false;
  }
  dobTransform(e: any): void {
    let date = this.form.get('dob').value;
    if (date) {
      let dateFormated = date.split('-');
      const rearrangedDate = `${dateFormated[0]}${dateFormated[1]}${dateFormated[2]}`;

      this.form.addControl(
        'VU ASSURE_DDN_JJ_1',
        this.fb.control(rearrangedDate)
      );
    }
  }
  dobAgeTransform(e: any): void {
    let date = this.form.get('dobAge').value;
    if (date) {
      let dateFormated = date.split('-');
      const rearrangedDate = `${dateFormated[0]}${dateFormated[1]}${dateFormated[2]}`;

      this.form.addControl('ASSURE_DDN_JJ_1', this.fb.control(rearrangedDate));
    }
  }
  dobRelTransform(e: any): void {
    let date = this.form.get('dobRel').value;
    if (date) {
      let dateFormated = date.split('-');
      const rearrangedDate = `${dateFormated[0]}${dateFormated[1]}${dateFormated[2]}`;

      this.form.addControl(
        'SUBSIDIAIRE_DDN_JJ_1',
        this.fb.control(rearrangedDate)
      );
    }
  }
  updateAge(dateOfBirth: Date): void {
    if (dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(dateOfBirth);
      const age = today.getFullYear() - birthDate.getFullYear();
      this.form.get('ÂGE_3').setValue(age);
    }
  }
  selectGender(e: any) {
    const selectedGender = e.target.value;

    switch (selectedGender) {
      case 'Propriétaire_sexe_M':
        this.form.removeControl('Propriétaire_sexe_F');
        this.form.addControl(
          'Propriétaire_sexe_M',
          this.fb.control(selectedGender)
        );
        break;
      case 'Propriétaire_sexe_F':
        this.form.removeControl('Propriétaire_sexe_M');
        this.form.addControl(
          'Propriétaire_sexe_F',
          this.fb.control(selectedGender)
        );
        break;

      case '':
        this.form.removeControl('Propriétaire_sexe_M');
        this.form.removeControl('Propriétaire_sexe_F');
        break;
      default:
    }
  }
  save() {
    // this.createPDF('john').then((res) => console.log(res));
    // this.formDataService.setFormData(this.form);
    console.log(this.form.value);
  }
  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }
}
