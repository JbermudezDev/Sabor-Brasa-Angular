import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoIconComponent } from './carrito-icon.component';

describe('CarritoIconComponent', () => {
  let component: CarritoIconComponent;
  let fixture: ComponentFixture<CarritoIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarritoIconComponent]
    });
    fixture = TestBed.createComponent(CarritoIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
