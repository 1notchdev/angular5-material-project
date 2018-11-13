import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MatSort, MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/table';

import { AuthService } from '../shared/services/auth.service';
import { MessagesService } from '../shared/services/messages.service';

import { environment } from '../../environments/environment';

@Component({
	selector: 'app-datasource',
	templateUrl: 'datasource.component.html',
	styleUrls: ['datasource.component.scss']
})
export class DataSourceComponent implements OnInit, OnDestroy {
	
	private _subscriptions: Subscription[] = [];

	constructor(
		public auth: AuthService,
		public router: Router,
		private messagesService: MessagesService,
	) {

	}

	ngOnInit(): void {
	}

	newStocksAgent() {
		this.router.navigate(['stocks']);
	}

	newCryptoAgent() {
		this.router.navigate(['crypto']);
	}

	newExcelAgent() {
		this.router.navigate(['excel']);
	}

	ngOnDestroy() {
		this._subscriptions.forEach(subscription => subscription.unsubscribe());
	}
}
