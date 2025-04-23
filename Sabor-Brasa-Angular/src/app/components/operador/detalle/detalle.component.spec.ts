import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleOperadorComponent } from './detalle.component';

describe('DetalleComponent', () => {
  let component: DetalleOperadorComponent;
  let fixture: ComponentFixture<DetalleOperadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleOperadorComponent]
    });
    fixture = TestBed.createComponent(DetalleOperadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
