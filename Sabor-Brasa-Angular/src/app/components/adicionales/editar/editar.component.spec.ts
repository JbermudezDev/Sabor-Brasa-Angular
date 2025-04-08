import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAdicionalComponent } from './editar.component';

describe('EditarComponent', () => {
  let component: EditarAdicionalComponent;
  let fixture: ComponentFixture<EditarAdicionalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarAdicionalComponent]
    });
    fixture = TestBed.createComponent(EditarAdicionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
