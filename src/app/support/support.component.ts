import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-support',
	templateUrl: './support.component.html',
	styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {

	support: any = {
		name:  '',
		email: '',
		subject: '',
		meessag: ''
	}

	error: String = '';
	
	constructor() { }

	ngOnInit() {
	}

	send() {
		alert("send!");
	}

}
