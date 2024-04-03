import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IdentityVerificationService {
  constructor() {}
  private formDataSubject = new BehaviorSubject<FormGroup>(null);
  formData$ = this.formDataSubject.asObservable();

  setFormData(formData: FormGroup): void {
    this.formDataSubject.next(formData);
  }
  getFormData(): FormGroup {
    return this.formDataSubject.value;
  }
}
