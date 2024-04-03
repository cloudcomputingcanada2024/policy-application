import { Injectable } from '@angular/core';
import { AxiosService } from './axios.service';
import { Observable, Subject, map } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { AuthDto } from '../dtos/request/auth.dtos';
import { LoginDto } from '../dtos/request/login.dtos';
import { LoginResponse } from '../dtos/response/login.response';
import { UserModel } from '../models/User.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  logInSubject = new Subject<UserModel>();
  constructor(private axiosService: AxiosService, private http: HttpClient) {}

  register(
    userInfo: AuthDto
  ): Observable<HttpResponse<any> | HttpErrorResponse> {
    return this.http.post<HttpResponse<any> | HttpErrorResponse>(
      `${AxiosService.baseURL}/signup`,
      userInfo
    );
  }
  login(
    userInfo: LoginDto
  ): Observable<HttpResponse<LoginResponse> | HttpErrorResponse> {
    return this.http
      .post<LoginResponse>(`${AxiosService.baseURL}/signin`, userInfo, {
        observe: 'response',
      })
      .pipe(
        map((res) => {
          console.log(res);

          return res;
        })
      );
  }
}
