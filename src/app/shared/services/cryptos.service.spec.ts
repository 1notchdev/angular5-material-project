import { TestBed, inject } from '@angular/core/testing';

import { CryptosService } from './cryptos.service';

describe('CryptosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CryptosService]
    });
  });

  it('should be created', inject([CryptosService], (service: CryptosService) => {
    expect(service).toBeTruthy();
  }));
});
