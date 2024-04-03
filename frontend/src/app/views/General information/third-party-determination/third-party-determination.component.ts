import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EmploymentdetailsService } from 'src/app/services/generalinformation/employmentdetails.service';
import { ThirdPartyDeterminationService } from 'src/app/services/generalinformation/third-party-determination.service';

@Component({
  selector: 'app-third-party-determination',
  templateUrl: './third-party-determination.component.html',
  styleUrls: ['./third-party-determination.component.css'],
})
export class ThirdPartyDeterminationComponent {
  form: FormGroup;
  formSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private formDataService: ThirdPartyDeterminationService
  ) {}

  ngOnInit(): void {
    const existingFormData = this.formDataService.getFormData();

    this.form =
      existingFormData ||
      this.fb.group({
        individualOrEntity: '',
        premium: '',
        NOM_TIERS: '',
        ADRESSE_TIERS: '',
        TEL_TIERS: '',
        ACTIVITÉ_PRINCIPALE_TIERS: '',
        LIEN_TIERS_PROPS: '',
        NUM_ENTREPRISE_TIERS: '',
        LIEU_DELIVRANCE_TIERS: '',
        NON_RENSEIGNEMENTS_TIERS: '',
        NON_DETERMINER_TIERS: '',
        DobThirdParty: '',
      });

    this.formSubscription = this.form.valueChanges.subscribe((data) => {
      this.formDataService.setFormData(this.form);
    });
  }

  selectEntity(e: any): void {
    const selectedEntity = e.target.value;

    switch (selectedEntity) {
      case 'Propriétaire_entity_yes':
        this.form.removeControl('Propriétaire_entity_no');
        this.form.removeControl('Propriétaire_entity_it_is_impossible');
        this.form.addControl(
          'Propriétaire_entity_yes',
          this.fb.control(selectedEntity)
        );
        break;
      case 'Propriétaire_entity_no':
        this.form.removeControl('Propriétaire_entity_yes');
        this.form.removeControl('Propriétaire_entity_it_is_impossible');
        this.form.addControl(
          'Propriétaire_entity_no',
          this.fb.control(selectedEntity)
        );
        break;
      case 'Propriétaire_entity_it_is_impossible':
        this.form.removeControl('Propriétaire_entity_yes');
        this.form.removeControl('Propriétaire_entity_no');
        this.form.addControl(
          'Propriétaire_entity_it_is_impossible',
          this.fb.control(selectedEntity)
        );
        break;
      case '':
        this.form.removeControl('Propriétaire_entity_yes');
        this.form.removeControl('Propriétaire_entity_no');
        this.form.removeControl('Propriétaire_entity_it_is_impossible');
        break;
      default:
    }
  }
  selectPremiun(e: any): void {
    const selectedPremiun = e.target.value;

    switch (selectedPremiun) {
      case 'Entité paiement 1':
        this.form.removeControl('Entité paiement 2');

        this.form.addControl(
          'Entité paiement 1',
          this.fb.control(selectedPremiun)
        );
        break;
      case 'Entité paiement 2':
        this.form.removeControl('Entité paiement 1');

        this.form.addControl(
          'Entité paiement 2',
          this.fb.control(selectedPremiun)
        );
        break;

      case '':
        this.form.removeControl('Entité paiement 1');
        this.form.removeControl('Entité paiement 2');
        break;
      default:
    }
    console.log(this.form.value);
  }
  dobThridParty(e: any): void {
    let date = this.form.get('DobThirdParty').value;
    if (date) {
      let dateFormated = date.split('-');
      const rearrangedDate = `${dateFormated[0]}${dateFormated[1]}${dateFormated[2]}`;

      this.form.addControl('DDN_TIERS', this.fb.control(rearrangedDate));
    }
    console.log(this.form.value);
  }
  save() {
    // this.createPDF('john').then((res) => console.log(res));
    this.formDataService.setFormData(this.form);
  }
  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }
}
