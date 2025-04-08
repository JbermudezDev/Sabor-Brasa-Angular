import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAdicionalComponent } from './listar.component';

describe('ListarComponent', () => {
  let component: ListarAdicionalComponent;
  let fixture: ComponentFixture<ListarAdicionalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarAdicionalComponent]
    });
    fixture = TestBed.createComponent(ListarAdicionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
