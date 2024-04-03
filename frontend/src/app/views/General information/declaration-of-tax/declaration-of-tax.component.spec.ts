import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclarationOfTaxComponent } from './declaration-of-tax.component';

describe('DeclarationOfTaxComponent', () => {
  let component: DeclarationOfTaxComponent;
  let fixture: ComponentFixture<DeclarationOfTaxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeclarationOfTaxComponent]
    });
    fixture = TestBed.createComponent(DeclarationOfTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
