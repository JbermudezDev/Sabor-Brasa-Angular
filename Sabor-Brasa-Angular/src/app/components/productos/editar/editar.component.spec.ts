import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProductoComponent } from './editar.component';

describe('EditarComponent', () => {
  let component: EditarProductoComponent;
  let fixture: ComponentFixture<EditarProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarProductoComponent]
    });
    fixture = TestBed.createComponent(EditarProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
