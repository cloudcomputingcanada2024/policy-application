import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { SettingComponent } from './setting/setting/setting.component';
import { LoginComponent } from './login/login.component';
import { DefaultLayoutComponent } from './layout';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProposedInsuredComponent } from './views/General information/proposed-insured/proposed-insured.component';
import { EmploymentDetailsComponent } from './views/General information/employment-details/employment-details.component';
import { PolicyownerComponent } from './views/General information/policyowner/policyowner.component';
import { DeclarationOfTaxComponent } from './views/General information/declaration-of-tax/declaration-of-tax.component';
import { IdentityVerificationComponent } from './views/General information/identity-verification/identity-verification.component';
import { ThirdPartyDeterminationComponent } from './views/General information/third-party-determination/third-party-determination.component';
import { BeneficiaryComponent } from './views/General information/beneficiary/beneficiary.component';
import { BasicInformationComponent } from './views/Basic-information/basic-information/basic-information.component';
import { SubmitComponent } from './submit/submit.component';
import { ESignatureComponent } from './views/e-signature/e-signature.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'dashboard',
        // loadChildren:()=> import('../app/components/dashboard/dashboard.component').then((m)=>m.DashboardComponent)
        component: DashboardComponent,
      },
      {
        path: 'general-information/proposed-insured',
        // loadChildren:()=> import('../app/components/dashboard/dashboard.component').then((m)=>m.DashboardComponent)
        component: ProposedInsuredComponent,
      },
      {
        path: 'general-information/employment-details',
        // loadChildren:()=> import('../app/components/dashboard/dashboard.component').then((m)=>m.DashboardComponent)
        component: EmploymentDetailsComponent,
      },
      {
        path: 'general-information/policyowner',
        // loadChildren:()=> import('../app/components/dashboard/dashboard.component').then((m)=>m.DashboardComponent)
        component: PolicyownerComponent,
      },
      {
        path: 'general-information/declaration-of-tax',
        // loadChildren:()=> import('../app/components/dashboard/dashboard.component').then((m)=>m.DashboardComponent)
        component: DeclarationOfTaxComponent,
      },
      {
        path: 'general-information/identity-verification',
        // loadChildren:()=> import('../app/components/dashboard/dashboard.component').then((m)=>m.DashboardComponent)
        component: IdentityVerificationComponent,
      },
      {
        path: 'general-information/third-party-determination',
        // loadChildren:()=> import('../app/components/dashboard/dashboard.component').then((m)=>m.DashboardComponent)
        component: ThirdPartyDeterminationComponent,
      },
      {
        path: 'general-information/beneficiary',
        // loadChildren:()=> import('../app/components/dashboard/dashboard.component').then((m)=>m.DashboardComponent)
        component: BeneficiaryComponent,
      },
      {
        path: 'basic-information',
        // loadChildren:()=> import('../app/components/dashboard/dashboard.component').then((m)=>m.DashboardComponent)
        component: BasicInformationComponent,
      },
      {
        path: 'submit',
        // loadChildren:()=> import('../app/components/dashboard/dashboard.component').then((m)=>m.DashboardComponent)
        component: SubmitComponent,
      },
      {
        path: 'e-signature',
        // loadChildren:()=> import('../app/components/dashboard/dashboard.component').then((m)=>m.DashboardComponent)
        component: ESignatureComponent,
      },
    ],
  },

  {
    path: 'login',
    component: LoginComponent,
    // outlet: 'user_account',
  },
  {
    path: 'register',
    component: RegisterComponent,
    // outlet: 'user_account',
  },
  {
    path: 'setting',
    component: SettingComponent,
    // outlet: 'user_account',
  },
  // { path: 'general-information', component: GeneralInformationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
