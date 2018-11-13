import { TestBed, inject } from '@angular/core/testing';

import { FetchStocksService } from './fetch-stocks.service';

describe('FetchStocksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FetchStocksService]
    });
  });

  it('should be created', inject([FetchStocksService], (service: FetchStocksService) => {
    expect(service).toBeTruthy();
  }));
});
