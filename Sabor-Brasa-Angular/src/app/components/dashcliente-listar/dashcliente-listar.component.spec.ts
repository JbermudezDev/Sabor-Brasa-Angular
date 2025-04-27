import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashclienteListarComponent } from './dashcliente-listar.component';

describe('DashclienteListarComponent', () => {
  let component: DashclienteListarComponent;
  let fixture: ComponentFixture<DashclienteListarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashclienteListarComponent]
    });
    fixture = TestBed.createComponent(DashclienteListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
