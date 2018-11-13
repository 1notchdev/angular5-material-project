import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { environment } from '../../../environments/environment';

import { StocksService } from '../../shared/services/stocks.service';

import { Stock } from '../../shared/models/stock.model';

@Injectable()
export class FetchStocksService {

	constructor(
		private stocksService: StocksService,
		private router: Router
	) { }

	resolve(route: ActivatedRouteSnapshot): Observable<Stock[]> | boolean {
		// var params = route.params;
		return this.stocksService.getList();
	}
}
