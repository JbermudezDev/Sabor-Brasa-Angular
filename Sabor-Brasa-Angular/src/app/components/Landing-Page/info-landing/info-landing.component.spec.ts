import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoLandingComponent } from './info-landing.component';

describe('InfoLandingComponent', () => {
  let component: InfoLandingComponent;
  let fixture: ComponentFixture<InfoLandingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoLandingComponent]
    });
    fixture = TestBed.createComponent(InfoLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
