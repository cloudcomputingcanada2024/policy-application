import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IdentityVerificationService } from 'src/app/services/generalinformation/identity-verification.service';

@Component({
  selector: 'app-identity-verification',
  templateUrl: './identity-verification.component.html',
  styleUrls: ['./identity-verification.component.css'],
})
export class IdentityVerificationComponent {
  form: FormGroup;
  formSubscription: Subscription;
  disableBtn: boolean = false;
  otherSpecify: boolean = false;
  otherSpecifyConinue: boolean = false;
  constructor(
    private fb: FormBuilder,
    private formDataService: IdentityVerificationService
  ) {}
  identitiesData = [
    {
      id: 0,
      name: 'N/A',
      disabled: false,
      value: 'N/A',
    },
    {
      id: 1,
      name: ' In the physical presence of each person',
      p: 'using an authentic (original), valid and unexpired (if applicable) government-issued photo identification document If you check this box, indicate below for each person, the identification document that has been reviewed, its number, its expiration date (if applicable) and jurisdiction. If the document selected below is “Other photo identification document admissible by Law”, specify the type of document verified. In Quebec, you are not allowed to request the client’s Health Card, but you can accept it only if the client offers it to you. In the provinces of Ontario, Manitoba, Nova Scotia and Prince Edward Island, the use of a Health Card for identification purposes is prohibited.',
      disabled: false,
      value: 'B5_EN_PRESENCE_PHYSIQUE',
    },
    {
      id: 2,
      name: 'Using the dual process method (if verification done remotely or if identification document not valid)',
      p: ' using two legible, valid and up-to-date documents from two different, independent and reliable sources If you check this box, the form Dual process method for identity verification – Individual – Financial security advisor/Representative declaration (FRA1913A) is required.',
      disabled: false,
      value: 'B5_PROCESSUS_DOUBLE',
    },
  ];

  selectedIdentities = this.identitiesData[1].name;
  ngOnInit(): void {
    const existingFormData = this.formDataService.getFormData();

    this.form =
      existingFormData ||
      this.fb.group({
        identities: '',
        documents: '',
        documentsContinue: '',
        'NOM DE ASSURÉ 1  DE LA PERSONNE AUTORISÉE': '',
        'VERIF_ID-1_assure_1': '',
        'NUMÉRO DU DOCUMENT Assure 1': '',
        'TERRITOIRE DE COMPÉTENCE Assure 1': '',
        /*identity continue*/
        'NOM DU PROPRIÉTAIRE  DE LA PERSONNE AUTORISÉE': '',
        'VERIF_ID_AUTRE_1-1': '',
        'NUMÉRO DU DOCUMENT': '',
        'TERRITOIRE DE COMPÉTENCE': '',
        dEpxDate: '',
        dEpxDateC: '',
      });
    this.form.valueChanges.subscribe((selectedIdentities) => {
      this.identitiesData.forEach((option, index) => {
        if (selectedIdentities?.identities[index] == 'N/A') {
          this.disableBtn = true;
          this.form.get('identities').disable();
        }
      });
    });
    this.formSubscription = this.form.valueChanges.subscribe((data) => {
      this.formDataService.setFormData(this.form);
    });
  }
  selectIdentity(e: any): void {
    let selectedIdentity = this.form.get('identities').value;

    let physical = selectedIdentity[0] != 'B5_EN_PRESENCE_PHYSIQUE';
    let dualProcess = selectedIdentity[0] != 'B5_PROCESSUS_DOUBLE';

    selectedIdentity.forEach((option, index) => {
      console.log(selectedIdentity[index] != 'B5_EN_PRESENCE_PHYSIQUE');

      if (selectedIdentity[index] != 'B5_EN_PRESENCE_PHYSIQUE') {
        this.form.removeControl('B5_EN_PRESENCE_PHYSIQUE');
      }
      if (selectedIdentity[index] != 'B5_PROCESSUS_DOUBLE') {
        this.form.removeControl('B5_PROCESSUS_DOUBLE');
      }
    });

    if (physical) {
      this.form.removeControl('B5_EN_PRESENCE_PHYSIQUE');
    }
    if (dualProcess) {
      this.form.removeControl('B5_PROCESSUS_DOUBLE');
    }

    selectedIdentity.forEach((option, index) => {
      if (selectedIdentity[index] === 'B5_EN_PRESENCE_PHYSIQUE') {
        this.form.addControl(
          'B5_EN_PRESENCE_PHYSIQUE',
          this.fb.control(option)
        );
      }
      if (selectedIdentity[index] === 'B5_PROCESSUS_DOUBLE') {
        this.form.addControl('B5_PROCESSUS_DOUBLE', this.fb.control(option));
      }
    });

    selectedIdentity.forEach((option, index) => {
      if (selectedIdentity[index] == 'N/A') {
        this.form.removeControl('B5_EN_PRESENCE_PHYSIQUE');
        this.form.removeControl('B5_PROCESSUS_DOUBLE');
      }
    });
    console.log(this.form.value);
  }
  enableSelect(): void {
    this.form.get('identities').setValue(null);
    this.form.get('identities').enable();
    this.disableBtn = false;
  }

  selectDocument(e: any): void {
    const selectedApplication = e.target.value;
    if (selectedApplication == 'Assure_verif_4') {
      this.otherSpecify = true;
    } else {
      this.otherSpecify = false;
      this.form.get('VERIF_ID-1_assure_1').setValue('');
    }
    switch (selectedApplication) {
      case 'Assure_verif_1':
        this.form.removeControl('Assure_verif_p_2');
        this.form.removeControl('Assure_verif_3');
        this.form.removeControl('Assure_verif_4');
        this.form.addControl(
          'Assure_verif_1',
          this.fb.control(selectedApplication)
        );
        break;
      case 'Assure_verif_p_2':
        this.form.removeControl('Assure_verif_1');
        this.form.removeControl('Assure_verif_3');
        this.form.removeControl('Assure_verif_4');
        this.form.addControl(
          'Assure_verif_p_2',
          this.fb.control(selectedApplication)
        );
        break;
      case 'Assure_verif_3':
        this.form.removeControl('Assure_verif_1');
        this.form.removeControl('Assure_verif_p_2');
        this.form.removeControl('Assure_verif_4');
        this.form.addControl(
          'Assure_verif_3',
          this.fb.control(selectedApplication)
        );
        break;
      case 'Assure_verif_4':
        this.form.removeControl('Assure_verif_1');
        this.form.removeControl('Assure_verif_p_2');
        this.form.removeControl('Assure_verif_3');
        this.form.addControl(
          'Assure_verif_4',
          this.fb.control(selectedApplication)
        );
        break;

      case '':
        this.form.removeControl('Assure_verif_1');
        this.form.removeControl('Assure_verif_p_2');
        this.form.removeControl('Assure_verif_3');
        this.form.removeControl('Assure_verif_4');
        break;
      default:
    }
  }
  selectDocumentContinue(e: any): void {
    const selectedDocument = e.target.value;
    if (selectedDocument == 'Assure_verif_c_4') {
      this.otherSpecifyConinue = true;
    } else {
      this.otherSpecifyConinue = false;
      this.form.get('VERIF_ID_AUTRE_1-1').setValue('');
    }
    switch (selectedDocument) {
      case 'Assure_verif_c_1':
        this.form.removeControl('Assure_verif_c_2');
        this.form.removeControl('Assure_verif_c_3');
        this.form.removeControl('Assure_verif_c_4');
        this.form.addControl(
          'Assure_verif_c_1',
          this.fb.control(selectedDocument)
        );
        break;
      case 'Assure_verif_c_2':
        this.form.removeControl('Assure_verif_c_1');
        this.form.removeControl('Assure_verif_c_3');
        this.form.removeControl('Assure_verif_c_4');
        this.form.addControl(
          'Assure_verif_c_2',
          this.fb.control(selectedDocument)
        );
        break;
      case 'Assure_verif_c_3':
        this.form.removeControl('Assure_verif_c_1');
        this.form.removeControl('Assure_verif_c_2');
        this.form.removeControl('Assure_verif_c_4');
        this.form.addControl(
          'Assure_verif_c_3',
          this.fb.control(selectedDocument)
        );
        break;
      case 'Assure_verif_c_4':
        this.form.removeControl('Assure_verif_c_1');
        this.form.removeControl('Assure_verif_c_2');
        this.form.removeControl('Assure_verif_c_3');
        this.form.addControl(
          'Assure_verif_c_4',
          this.fb.control(selectedDocument)
        );
        break;

      case '':
        this.form.removeControl('Assure_verif_c_1');
        this.form.removeControl('Assure_verif_c_2');
        this.form.removeControl('Assure_verif_c_3');
        this.form.removeControl('Assure_verif_c_4');
        break;
      default:
    }
  }
  documentExperirationDateTransform(e: any): void {
    let date = this.form.get('dEpxDate').value;
    if (date) {
      let dateFormated = date.split('-');
      const rearrangedDate = `${dateFormated[0]}${dateFormated[1]}${dateFormated[2]}`;

      this.form.addControl(
        'Expiration_doc_1 Assure 1',
        this.fb.control(rearrangedDate)
      );
    }
  }
  documentExperirationDateCTransform(e: any): void {
    let date = this.form.get('dEpxDateC').value;
    if (date) {
      let dateFormated = date.split('-');
      const rearrangedDate = `${dateFormated[0]}${dateFormated[1]}${dateFormated[2]}`;

      this.form.addControl('Expiration_doc_1', this.fb.control(rearrangedDate));
    }
    console.log(this.form.value);
  }
  save() {
    // this.createPDF('john').then((res) => console.log(res));
    // this.formDataService.setFormData(this.form);
  }
  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }
}
