import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { error } from 'pdf-lib';
import { Subscription } from 'rxjs';
import { DateTransformPipe } from 'src/app/CustomePipes/date-transform.pipe';
import { FormDataDTO } from 'src/app/dtos/request/formdata.dtos';
import { BasicInformationService } from 'src/app/services/basic-information/basic-information.service';
import { EmploymentdetailsService } from 'src/app/services/generalinformation/employmentdetails.service';
import { ProposedinsuredService } from 'src/app/services/generalinformation/proposedinsured.service';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-proposed-insured',
  templateUrl: './proposed-insured.component.html',
  styleUrls: ['./proposed-insured.component.css'],
})
export class ProposedInsuredComponent implements OnInit {
  form: FormGroup;
  formSubscription: Subscription;
  selectNameAbbr = '';
  otherSelected: boolean = false;
  isTransformDate: boolean = false;

  constructor(
    private fb: FormBuilder,
    private formDataService: ProposedinsuredService,
    // private formDataService1: EmploymentdetailsService,
    private formDataService2: BasicInformationService,
    private mainService: MainService,
    private toaster: ToastrService,
    public dateTransform: DateTransformPipe
  ) {}
  ngOnInit(): void {
    const existingFormData = this.formDataService.getFormData();

    this.form =
      existingFormData ||
      this.fb.group({
        selectNameAbbr: '',
        PRÉNOM: '',
        NOM: '',
        'NOM À LA NAISSANCE si différent': '',
        ÂGE: '',
        gender: '',
        'LIEU DE NAISSANCE ville et pays': '',

        statusLegal: '',
        'AUTRE précisez': '',
        'NUMÉRO CIVIQUE ET NOM DE LA RUE': '',
        APP: '',
        VILLE: '',
        PROVINCE: '',
        'CODE POSTAL': '',
        'TÉLÉPHONE RÉSIDENCE': '',
        'ADRESSE COURRIEL internet': '',
        dateOfBirth: '',
        arrivalDate: '',
      });

    this.formSubscription = this.form.valueChanges.subscribe((data) => {
      this.formDataService.setFormData(this.form);
    });
    this.formSubscription = this.form
      .get('dateOfBirth')
      .valueChanges.subscribe((date) => {
        this.updateAge(date);
      });
  }

  updateAge(dateOfBirth: Date): void {
    if (dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(dateOfBirth);
      const age = today.getFullYear() - birthDate.getFullYear();
      this.form.get('ÂGE').setValue(age);
    }
  }
  dobTransform(e: any): void {
    let dob = this.form.get('dateOfBirth').value;
    if (dob) {
      let dateFormated = dob.split('-');
      const rearrangedDate = `${dateFormated[0]}${dateFormated[1]}${dateFormated[2]}`;

      this.form.addControl(
        'DATE DE NAISSANCE JJMMAAAA',
        this.fb.control(rearrangedDate)
      );
    }
  }
  arrivalDateTransform(e: any): void {
    let arrivalDate = this.form.get('arrivalDate').value;
    if (arrivalDate) {
      let dateFormated = arrivalDate.split('-');
      const rearrangedDate = `${dateFormated[0]}${dateFormated[1]}${dateFormated[2]}`;

      this.form.addControl('DATE DARRIVÉE', this.fb.control(rearrangedDate));
    }
  }

  selectGenderNatural(e: any) {
    const selectedName = e.target.value;

    switch (selectedName) {
      case 'Assure_verif_mr':
        this.form.removeControl('Assure_verif_mrs');
        this.form.removeControl('Assure_verif_ms');
        this.form.addControl('Assure_verif_mr', this.fb.control(selectedName));
        break;
      case 'Assure_verif_mrs':
        this.form.removeControl('Assure_verif_mr');
        this.form.removeControl('Assure_verif_ms');
        this.form.addControl('Assure_verif_mrs', this.fb.control(selectedName));
        break;
      case 'Assure_verif_ms':
        this.form.removeControl('Assure_verif_mrs');
        this.form.removeControl('Assure_verif_mr');
        this.form.addControl('Assure_verif_ms', this.fb.control(selectedName));
        break;

      case '':
        this.form.removeControl('Assure_verif_mr');
        this.form.removeControl('Assure_verif_mrs');
        this.form.removeControl('Assure_verif_ms');
        break;
      default:
    }
  }
  selectGender(e: any) {
    const selectedGender = e.target.value;

    switch (selectedGender) {
      case 'MASC_M':
        this.form.removeControl('MASC_F');
        this.form.addControl('MASC_M', this.fb.control(selectedGender));
        break;
      case 'MASC_F':
        this.form.removeControl('MASC_M');
        this.form.addControl('MASC_F', this.fb.control(selectedGender));
        break;

      case '':
        this.form.removeControl('MASC_M');
        this.form.removeControl('MASC_F');
        break;
      default:
    }
  }

  selectStatus(e: any) {
    let statusLegal = this.form.get('statusLegal').value;
    console.log(statusLegal);
    switch (statusLegal) {
      case 'Statut légal_coche1':
        this.form.removeControl('Statut légal_coche2');
        this.form.removeControl('Statut légal_coche3');
        this.form.removeControl('Statut légal_coche4');
        this.form.removeControl('Statut légal_coche5');
        this.form.addControl(
          'Statut légal_coche1',
          this.fb.control(statusLegal)
        );
        break;
      case 'Statut légal_coche2':
        this.form.removeControl('Statut légal_coche1');
        this.form.removeControl('Statut légal_coche3');
        this.form.removeControl('Statut légal_coche4');
        this.form.removeControl('Statut légal_coche5');
        this.form.addControl(
          'Statut légal_coche2',
          this.fb.control(statusLegal)
        );
        break;
      case 'Statut légal_coche3':
        this.form.removeControl('Statut légal_coche1');
        this.form.removeControl('Statut légal_coche2');
        this.form.removeControl('Statut légal_coche4');
        this.form.removeControl('Statut légal_coche5');
        this.form.addControl(
          'Statut légal_coche3',
          this.fb.control(statusLegal)
        );
        break;
      case 'Statut légal_coche4':
        this.form.removeControl('Statut légal_coche1');
        this.form.removeControl('Statut légal_coche2');
        this.form.removeControl('Statut légal_coche3');
        this.form.removeControl('Statut légal_coche5');
        this.form.addControl(
          'Statut légal_coche4',
          this.fb.control(statusLegal)
        );
        break;
      case 'Statut légal_coche5':
        this.form.removeControl('Statut légal_coche1');
        this.form.removeControl('Statut légal_coche2');
        this.form.removeControl('Statut légal_coche3');
        this.form.removeControl('Statut légal_coche4');
        this.form.addControl(
          'Statut légal_coche5',
          this.fb.control(statusLegal)
        );
        break;
      case '':
        this.form.removeControl('Statut légal_coche1');
        this.form.removeControl('Statut légal_coche2');
        this.form.removeControl('Statut légal_coche3');
        this.form.removeControl('Statut légal_coche4');
        this.form.removeControl('Statut légal_coche5');

        break;
      default:
    }

    if (e.target.value === 'Statut légal_coche5') {
      this.otherSelected = true;
    } else {
      this.otherSelected = false;
      this.form.get('AUTRE précisez').setValue('');
    }
  }

  save() {
    // this.formDataService.setFormData(this.form);
    console.log(this.form.value);
  }
  formSubmit() {}
}
