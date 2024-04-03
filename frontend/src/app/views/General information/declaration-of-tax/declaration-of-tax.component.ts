import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DeclarationOfTaxService } from 'src/app/services/generalinformation/declaration-of-tax.service';

@Component({
  selector: 'app-declaration-of-tax',
  templateUrl: './declaration-of-tax.component.html',
  styleUrls: ['./declaration-of-tax.component.css'],
})
export class DeclarationOfTaxComponent {
  form: FormGroup;
  formSubscription: Subscription;
  disableBtn: boolean = false;
  constructor(
    private fb: FormBuilder,
    private formDataService: DeclarationOfTaxService
  ) {}

  ngOnInit(): void {
    const existingFormData = this.formDataService.getFormData();

    this.form =
      existingFormData ||
      this.fb.group({
        residents: '',
      });

    this.form.valueChanges.subscribe((selectedValue) => {
      Array.from([0, 1, 2]).forEach((option, index) => {
        if (selectedValue?.residents[index] == 'N/A') {
          this.disableBtn = true;
          this.form.get('residents').disable();
        }
      });
    });
    this.formSubscription = this.form.valueChanges.subscribe((data) => {
      this.formDataService.setFormData(this.form);
    });
  }

  selectResident(e: any): void {
    let residents = this.form.get('residents').value;
    if (
      residents[0] === 'Propriétaire_statut1' ||
      residents[1] === 'Propriétaire_statut1'
    ) {
      this.form.addControl(
        'Propriétaire_statut1',
        this.fb.control('Propriétaire_statut1')
      );
    } else {
      this.form.removeControl('Propriétaire_statut1');
    }
    if (
      residents[0] == 'Propriétaire_statut3' ||
      residents[1] == 'Propriétaire_statut3'
    ) {
      this.form.addControl(
        'Propriétaire_statut3',
        this.fb.control('Propriétaire_statut3')
      );
    } else {
      this.form.removeControl('Propriétaire_statut3');
    }

    if (
      residents[0] == 'N/A' ||
      residents[1] == 'N/A' ||
      residents[2] == 'N/A'
    ) {
      this.disableBtn = true;
      this.form.removeControl('Propriétaire_statut1');
      this.form.removeControl('Propriétaire_statut3');
    }
    console.log(this.form.value);
  }
  enableSelect(): void {
    this.form.get('residents').setValue(null);
    this.form.get('residents').enable();
    this.disableBtn = false;
  }
  save() {
    // this.createPDF('john').then((res) => console.log(res));
    // this.formDataService.setFormData(this.form);
  }
  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
    // this.form.get('residents').setValue(null);
    // this.form.get('residents').enable();
  }
}
