import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'app-stocks-agent',
	templateUrl: 'stocks-agent.component.html',
	styleUrls: ['stocks-agent.component.scss']
})
export class StocksAgentComponent implements OnInit, OnDestroy {
	
	private _subscriptions: Subscription[] = [];
	model: any = null;
	settings: any = {};

	constructor(
		public router: Router
	) {

	}

	ngOnInit(): void {
		this.model = JSON.parse(localStorage.getItem('currentModel'));
		for (let mv of this.model['Variables']) {
			this.settings[mv.Name.toLowerCase()] = mv.type;
		}
	}
	
	train() {
		alert('Clicked Train button!');
	}

	ngOnDestroy() {
		this._subscriptions.forEach(subscription => subscription.unsubscribe());
	}
}
