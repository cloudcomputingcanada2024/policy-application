import { CUSTOM_ELEMENTS_SCHEMA, NgModule, Pipe } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RegisterComponent } from './register/register.component';
import { SettingComponent } from './setting/setting/setting.component';
import { LoginComponent } from './login/login.component';
import { ProposedInsuredComponent } from './views/General information/proposed-insured/proposed-insured.component';
import { SidebarComponent } from './layout/default-layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/default-layout/footer/footer.component';
import { DefaultLayoutComponent } from './layout';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsComponent } from './components/forms/forms.component';
import { HeaderComponent } from './layout/default-layout/header/header.component';
import { EmploymentDetailsComponent } from './views/General information/employment-details/employment-details.component';
import { PolicyownerComponent } from './views/General information/policyowner/policyowner.component';
import { DateTransformPipe } from './CustomePipes/date-transform.pipe';
import { DeclarationOfTaxComponent } from './views/General information/declaration-of-tax/declaration-of-tax.component';
import { IdentityVerificationComponent } from './views/General information/identity-verification/identity-verification.component';
import { ThirdPartyDeterminationComponent } from './views/General information/third-party-determination/third-party-determination.component';
import { BeneficiaryComponent } from './views/General information/beneficiary/beneficiary.component';
import { BasicInformationComponent } from './views/Basic-information/basic-information/basic-information.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { SubmitComponent } from './submit/submit.component';
import { AngularSignaturePadModule } from '@almothafar/angular-signature-pad';
import { ESignatureComponent } from './views/e-signature/e-signature.component';

const APP_DEFAULT_LAYOUT = [
  SidebarComponent,
  HeaderComponent,
  FooterComponent,
  DefaultLayoutComponent,
];

@NgModule({
  declarations: [
    AppComponent,
    ...APP_DEFAULT_LAYOUT,
    RegisterComponent,
    SettingComponent,
    LoginComponent,
    ProposedInsuredComponent,
    DashboardComponent,
    FormsComponent,
    HeaderComponent,
    EmploymentDetailsComponent,
    PolicyownerComponent,
    DateTransformPipe,
    DeclarationOfTaxComponent,
    IdentityVerificationComponent,
    ThirdPartyDeterminationComponent,
    BeneficiaryComponent,
    BasicInformationComponent,
    SubmitComponent,
    ESignatureComponent,
  ],
  // declarations: [AppComponent, ...APP_DEFAULT_LAYOUT],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), // ToastrModule added
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,
    NgxSpinnerModule,
    LoadingBarHttpClientModule,
    LoadingBarModule,
    // NgxSpinnerModule.forRoot({ type: 'ball-clip-rotate' }),
    AngularSignaturePadModule,
    // HttpClientInMemoryWebApiModule.forRoot(DataService),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DateTransformPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
