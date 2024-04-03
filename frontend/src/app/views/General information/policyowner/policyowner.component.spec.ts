import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyownerComponent } from './policyowner.component';

describe('PolicyownerComponent', () => {
  let component: PolicyownerComponent;
  let fixture: ComponentFixture<PolicyownerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PolicyownerComponent]
    });
    fixture = TestBed.createComponent(PolicyownerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
