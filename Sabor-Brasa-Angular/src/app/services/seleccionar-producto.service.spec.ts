import { TestBed } from '@angular/core/testing';

import { SeleccionarProductoService } from './seleccionar-producto.service';

describe('SeleccionarProductoService', () => {
  let service: SeleccionarProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeleccionarProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
