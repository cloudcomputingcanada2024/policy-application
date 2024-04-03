import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdPartyDeterminationComponent } from './third-party-determination.component';

describe('ThirdPartyDeterminationComponent', () => {
  let component: ThirdPartyDeterminationComponent;
  let fixture: ComponentFixture<ThirdPartyDeterminationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThirdPartyDeterminationComponent]
    });
    fixture = TestBed.createComponent(ThirdPartyDeterminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
