import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe, timeout, timer } from 'rxjs';
import { AxiosService } from './axios.service';
import { FormDataDTO } from '../dtos/request/formdata.dtos';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private http: HttpClient, private axiosSeri: AxiosService) {}

  formDataPost(data): Observable<HttpResponse<any> | HttpErrorResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const nonStandardData = {
      '0': { streetName: 'calgary', apt: 'apt' },
      '1': {
        'PROFESSION ET NOMBRE DANNÉES DE SERVICE': 'developer',
        employmentStatus: 'employe',
      },
    };
    const standardData = Object.keys(data).map((key) => data[key]);

    return this.http.post<HttpResponse<any> | HttpErrorResponse>(
      `${AxiosService.baseURL}/pdf/create`,
      data,
      { headers }
    );
  }

  downloadPdfFile(): Observable<ArrayBuffer> {
    return this.http.get(`${AxiosService.baseURL}/pdf/download`, {
      responseType: 'arraybuffer',
    });
  }
}
