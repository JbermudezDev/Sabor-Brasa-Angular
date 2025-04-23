import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarDashClienteComponent } from './listar.component';

describe('ListarDashClienteComponent', () => {
  let component: ListarDashClienteComponent;
  let fixture: ComponentFixture<ListarDashClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarDashClienteComponent]
    });
    fixture = TestBed.createComponent(ListarDashClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
