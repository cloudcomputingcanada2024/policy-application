import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { Subscription } from 'rxjs';
import { EmploymentdetailsService } from 'src/app/services/generalinformation/employmentdetails.service';

@Component({
  selector: 'app-employment-details',
  templateUrl: './employment-details.component.html',
  styleUrls: ['./employment-details.component.css'],
})
export class EmploymentDetailsComponent implements OnInit, OnDestroy {
 
  form: FormGroup;
  formSub: Subscription;
  constructor(
    private fb: FormBuilder,
    private formDataService: EmploymentdetailsService
  ) {}

  ngOnInit(): void {
    const existingFormData = this.formDataService.getFormData();

    this.form =
      existingFormData ||
      this.fb.group({
        'PROFESSION ET NOMBRE DANNÉES DE SERVICE': '',
        'FONCTIONS DE LEMPLOI': '',
        'NATURE DE LENTREPRISE DE LEMPLOYEUR': '',
        'REVENU ANNUEL BRUT': '',
        'VALEUR NETTE DES ACTIFS': '',
        'AUTRE REVENU': '',
        'AUTRE REVENU SOURCE': '',
        'NOM DE LEMPLOYEUR': '',
        'NUMÉRO CIVIQUE ET NOM DE LA RUE_5': '',
        'NUMÉRO DE BUREAU': '',
        VILLE_5: '',
        PROVINCE_5: '',
        'CODE POSTAL_5': '',
        'TÉLÉPHONE TRAVAIL': '',
      });

    this.formSub = this.form.valueChanges.subscribe((data) => {
      this.formDataService.setFormData(this.form);
    });
  }

 
  private async getPDF(): Promise<Uint8Array> {
    const response = await fetch('assets/PaperApplication.pdf');
    console.log(response);

    return new Uint8Array(await response.arrayBuffer());
  }
  save() {
    // this.createPDF('john').then((res) => console.log(res));
    // this.formDataService.setFormData(this.form);
    console.log(this.form.value);
    
  }
  ngOnDestroy(): void {
    this.formSub.unsubscribe();
  }
}
