import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderclienteComponent } from './headercliente.component';

describe('HeaderclienteComponent', () => {
  let component: HeaderclienteComponent;
  let fixture: ComponentFixture<HeaderclienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderclienteComponent]
    });
    fixture = TestBed.createComponent(HeaderclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
