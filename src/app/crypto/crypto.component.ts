import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../shared/services/auth.service';
import { MessagesService } from '../shared/services/messages.service';

@Component({
	selector: 'app-crypto',
	templateUrl: 'crypto.component.html',
	styleUrls: ['crypto.component.scss']
})
export class CryptoComponent implements OnInit, OnDestroy {
	
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
