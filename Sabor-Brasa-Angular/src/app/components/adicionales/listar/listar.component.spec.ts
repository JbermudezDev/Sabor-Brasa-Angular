import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAdicionalesComponent } from './listar.component';

describe('ListarComponent', () => {
  let component: ListarAdicionalesComponent;
  let fixture: ComponentFixture<ListarAdicionalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarAdicionalesComponent]
    });
    fixture = TestBed.createComponent(ListarAdicionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
