import { TestBed } from '@angular/core/testing';

import { PrestadoresService } from './prestadores.service';

describe('PrestadoresService', () => {
  let service: PrestadoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrestadoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
