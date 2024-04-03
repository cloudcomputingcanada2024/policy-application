import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, isEmpty, map } from 'rxjs';
import { UserService } from '../services/user.service';
// import { AxiosService } from './axios.service';
import { LoginDto } from '../dtos/request/login.dtos';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private userService: UserService) {
    this.createForm();
  }
  loginForm: FormGroup;
  formSubmit: boolean = false;
  access_token: string = '';
  private createForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }
  onSubmit(): void {
    const loginDto = new LoginDto();
    loginDto.email = this.loginForm.value.email;
    loginDto.password = this.loginForm.value.password;
    if (this.loginForm.valid) {
       this.userService.login(loginDto).subscribe();
    } else {
      alert(JSON.stringify('not '));
    }
  }
}
