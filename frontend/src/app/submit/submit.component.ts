import { Component, OnInit } from '@angular/core';
import { BasicInformationService } from '../services/basic-information/basic-information.service';
import { ProposedinsuredService } from '../services/generalinformation/proposedinsured.service';
import { EmploymentdetailsService } from '../services/generalinformation/employmentdetails.service';
import { PolicyownerService } from '../services/generalinformation/policyowner.service';
import { DeclarationOfTaxService } from '../services/generalinformation/declaration-of-tax.service';
import { IdentityVerificationService } from '../services/generalinformation/identity-verification.service';
import { ThirdPartyDeterminationService } from '../services/generalinformation/third-party-determination.service';
import { BeneficiaryService } from '../services/generalinformation/beneficiary.service';
import { MainService } from '../services/main.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { timeout, timer } from 'rxjs';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.css'],
})
export class SubmitComponent implements OnInit {
  statusCode: string = '';
  statusCodeValue: number = null;
  isLoading: boolean = false;
  constructor(
    private mainService: MainService,
    private basicInformationService: BasicInformationService,
    private proposedInsuredService: ProposedinsuredService,
    private employmentService: EmploymentdetailsService,
    private policyownerService: PolicyownerService,
    private declarationOfTaxService: DeclarationOfTaxService,
    private identityVerificationService: IdentityVerificationService,
    private thirdPartyDeterminationService: ThirdPartyDeterminationService,
    private beneficiaryService: BeneficiaryService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private loadingBar: LoadingBarService
  ) {}

  ngOnInit(): void {}

  downloadPdf() {
    this.isLoading = true;
    this.mainService.downloadPdfFile().subscribe((pdfData: ArrayBuffer) => {
      setTimeout(() => {
        const blob = new Blob([pdfData], { type: 'applicaton/pdf' });
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'Muzaffar.mian.pdf';
        link.click();
        this.isLoading = false;
      }, 1000);
    });
  }
  submit() {
    const req = this.loadingBar.useRef('http');

    let form_data = [
      this.basicInformationService.getFormData()?.value,
      this.proposedInsuredService.getFormData()?.value,
      this.employmentService.getFormData()?.value,
      this.policyownerService.getFormData()?.value,
      this.declarationOfTaxService.getFormData()?.value,
      this.identityVerificationService.getFormData()?.value,
      this.thirdPartyDeterminationService.getFormData()?.value,
      this.beneficiaryService.getFormData()?.value,
    ];
    const standardData = Object.keys(form_data).map((key) => form_data[key]);

    this.spinner.show();
    req.start();
    this.mainService.formDataPost(standardData).subscribe(
      (res) => {
        if (res) {
          this.toaster.success('Sent successfully!');
        } else {
          this.toaster.warning('something went wrong');
          this.spinner.hide();
          req.complete();
        }
      },
      (error) => {
        if (error.message) {
          this.toaster.error('server error');
          this.spinner.hide();
          req.complete();
        }

        console.log('error => ', error);
      },
      () => {
        this.spinner.hide();
        req.complete();
      }
    );
  }
}
