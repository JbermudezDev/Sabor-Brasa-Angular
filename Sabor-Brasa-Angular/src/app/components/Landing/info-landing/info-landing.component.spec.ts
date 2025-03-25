import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoLandingComponent } from './info-landing.component';

describe('InfoLandingComponent', () => {
  let component: InfoLandingComponent;
  let fixture: ComponentFixture<InfoLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoLandingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});