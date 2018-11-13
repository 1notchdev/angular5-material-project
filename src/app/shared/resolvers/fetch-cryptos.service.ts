import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { environment } from '../../../environments/environment';

import { CryptosService } from '../../shared/services/cryptos.service';

import { Crypto } from '../../shared/models/crypto.model';

@Injectable()
export class FetchCryptosService {

	constructor(
		private cryptosService: CryptosService,
		private router: Router
	) { }

	resolve(route: ActivatedRouteSnapshot): Observable<Crypto[]> | boolean {
		var params = route.params;
		return this.cryptosService.getList();
	}
}
