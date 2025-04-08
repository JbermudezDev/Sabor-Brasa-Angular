import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAdicionalComponent } from './detalle.component';

describe('DetalleComponent', () => {
  let component: DetalleAdicionalComponent;
  let fixture: ComponentFixture<DetalleAdicionalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleAdicionalComponent]
    });
    fixture = TestBed.createComponent(DetalleAdicionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
