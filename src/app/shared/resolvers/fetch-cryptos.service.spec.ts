import { TestBed, inject } from '@angular/core/testing';

import { FetchCryptosService } from './fetch-cryptos.service';

describe('FetchCryptosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FetchCryptosService]
    });
  });

  it('should be created', inject([FetchCryptosService], (service: FetchCryptosService) => {
    expect(service).toBeTruthy();
  }));
});
