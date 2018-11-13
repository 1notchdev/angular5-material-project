import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'app-excel-agent',
	templateUrl: 'excel-agent.component.html',
	styleUrls: ['excel-agent.component.scss']
})
export class ExcelAgentComponent implements OnInit, OnDestroy {
	
	private _subscriptions: Subscription[] = [];

	model: any = null;
	settings: any = {};
	// settings: any = {
	// 	time_series: false,
	// 	future_time_step: 1,
	// 	past_time_step: 3,
	// 	total_weeks_training: 4
	// };

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
