import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { AuthDto } from '../dtos/request/auth.dtos';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AuthResponse } from '../dtos/response/auth.response';
// import FormValidation from '../_helper/FormValidation';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private toastrService: ToastrService,
    private userService: UserService
  ) {
    this.createForm();
  }

  private subscription: Subscription[] = [];
  registerForm: FormGroup;
  formSubmit: boolean = false;

  ngOnInit(): void {}

  get user_name() {
    return this.registerForm.get('user_name');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get mobile_number() {
    return this.registerForm.get('mobile_number');
  }

  private createForm(): void {
    this.registerForm = new FormGroup({
      user_name: new FormControl('', [
        Validators.required,
        Validators.maxLength(64),
      ]),
      mobile_number: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\+?\d{11,12}$/),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  public onSubmit(): void {
    if (this.registerForm.valid) {
      const authDto = new AuthDto();
      authDto.user_name = this.user_name?.value;
      authDto.email = this.email?.value;
      authDto.password = this.password?.value;
      authDto.mobile_number = this.mobile_number?.value;

      this.subscription.push(
        this.userService.register(authDto).subscribe({
          next: (response: HttpResponse<AuthResponse>) => {
            console.log(response);
            console.log('reponse inside');
          },

          error: (error: HttpErrorResponse) => {
            console.log(error.error);
            console.log(error.message);
            console.log('error inside');

            this.toastrService.error(error.message);
          },

          complete() {
            console.log('your authentication is successful');
          },
        })
      );
    } else {
      // FormValidation.validateAllFields(this.registerForm);
      this.toastrService.error('Please all fields is required');
    }
  }
}
