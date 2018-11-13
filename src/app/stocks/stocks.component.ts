import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../shared/services/auth.service';
import { MessagesService } from '../shared/services/messages.service';

import { environment } from '../../environments/environment';

@Component({
	selector: 'app-stocks',
	templateUrl: 'stocks.component.html',
	styleUrls: ['stocks.component.scss']
})
export class StocksComponent implements OnInit, OnDestroy {
	
	private _subscriptions: Subscription[] = [];

	constructor(
		public auth: AuthService,
		public router: Router,
		private messagesService: MessagesService,
	) {

	}

	ngOnInit(): void {
		
	}

	ngOnDestroy() {
		this._subscriptions.forEach(subscription => subscription.unsubscribe());
	}
}
