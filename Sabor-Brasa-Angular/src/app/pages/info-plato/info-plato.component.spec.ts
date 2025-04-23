import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPlatoComponent } from './info-plato.component';

describe('InfoPlatoComponent', () => {
  let component: InfoPlatoComponent;
  let fixture: ComponentFixture<InfoPlatoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoPlatoComponent]
    });
    fixture = TestBed.createComponent(InfoPlatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
