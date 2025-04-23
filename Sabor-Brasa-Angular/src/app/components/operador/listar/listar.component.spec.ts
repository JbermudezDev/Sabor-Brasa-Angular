import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarOperadorComponent } from './listar.component';

describe('ListarComponent', () => {
  let component: ListarOperadorComponent;
  let fixture: ComponentFixture<ListarOperadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarOperadorComponent]
    });
    fixture = TestBed.createComponent(ListarOperadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
