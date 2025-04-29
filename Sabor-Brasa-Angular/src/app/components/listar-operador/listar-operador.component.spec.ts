import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarOperadoresComponent } from './listar-operador.component';

describe('ListarOperadorComponent', () => {
  let component: ListarOperadoresComponent;
  let fixture: ComponentFixture<ListarOperadoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarOperadoresComponent]
    });
    fixture = TestBed.createComponent(ListarOperadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
