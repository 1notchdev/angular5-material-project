import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MatSort, MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { NotificationsService } from 'angular2-notifications';

import { AuthService } from '../../shared/services/auth.service';
import { CryptosService } from '../../shared/services/cryptos.service';
import { MessagesService } from '../../shared/services/messages.service';

import { environment } from '../../../environments/environment';

import { Crypto } from '../../shared/models/crypto.model';

@Component({
	selector: 'app-crypto-list',
	templateUrl: 'crypto-list.component.html',
	styleUrls: ['crypto-list.component.scss']
})
export class CryptoListComponent implements OnInit, OnDestroy {
	
	private _subscriptions: Subscription[] = [];

	cryptos: Crypto[];
	selCryptoData: Crypto = null;
	displayedColumns: string[] = ['Currency', 'Symbol', 'LatestPrice', 'Popularity'];
	dataSource;

	@ViewChild(MatSort) sort: MatSort;

	constructor(
		public auth: AuthService,
		public router: Router,
		private route: ActivatedRoute,
		private messagesService: MessagesService,
		public notificationsService: NotificationsService,
		private cryptoService: CryptosService
	) {

	}

	ngOnInit(): void {
		this.route.data.subscribe((data: { cryptos: Crypto[] }) => {
			this.cryptos = data.cryptos;
			this.createTable();
		});
	}
	
	newAgent() {
		if (this.selCryptoData && this.selCryptoData['Currency']) {
			this.cryptoService.create(this.selCryptoData['Currency']).subscribe((new_model) => {
				localStorage.setItem('currentModel', JSON.stringify(new_model));
				this.goCryptoAgent();
			});
		} else {
			this.notificationsService.error(
				'Please select one cryptocurrency',
				"&nbsp;",
				{
					timeOut: 2000,
					pauseOnHover: false,
					clickToClose: true,
				}
			);
		}
	}

	createTable() {
		this.dataSource = new MatTableDataSource(this.cryptos);
		this.dataSource.sort = this.sort;
	}

	selCrypto(data: Crypto) {
		this.selCryptoData = data;
	}

	parseFloat(str: string) {
		return parseFloat(str);
	}

	goCryptoAgent() {
		this.router.navigate(['crypto/agent']);
	}

	ngOnDestroy() {
		this._subscriptions.forEach(subscription => subscription.unsubscribe());
	}
}
