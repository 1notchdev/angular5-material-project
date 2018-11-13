import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MatSort, MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { NotificationsService } from 'angular2-notifications';

import { AuthService } from '../../shared/services/auth.service';
import { MessagesService } from '../../shared/services/messages.service';

import { environment } from '../../../environments/environment';

import { Excel } from '../../shared/models/excel.model';

@Component({
	selector: 'app-excel-list',
	templateUrl: 'excel-list.component.html',
	styleUrls: ['excel-list.component.scss']
})
export class ExcelListComponent implements OnInit, OnDestroy {
	
	private _subscriptions: Subscription[] = [];

	excels: Excel[];
	selExcelData: Excel = null;
	displayedColumns: string[] = ['Currency', 'Symbol', 'LatestPrice', 'Popularity'];
	dataSource;

	@ViewChild(MatSort) sort: MatSort;

	constructor(
		public auth: AuthService,
		public router: Router,
		private route: ActivatedRoute,
		private messagesService: MessagesService,
		public notificationsService: NotificationsService,
	) {

	}

	ngOnInit(): void {
		this.route.data.subscribe((data: { excels: Excel[] }) => {
			this.excels = data.excels;
			this.createTable();
		});
	}
	
	newList() {
		if (this.selExcelData && this.selExcelData['Currency']) {
			this.goExcelList();
		} else {
			this.notificationsService.error(
				'Please select one excelcurrency',
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
		this.dataSource = new MatTableDataSource(this.excels);
		this.dataSource.sort = this.sort;
	}

	selExcel(data: Excel) {
		this.selExcelData = data;
	}

	parseFloat(str: string) {
		return parseFloat(str);
	}

	goExcelList() {
		this.router.navigate(['excel/list']);
	}

	ngOnDestroy() {
		this._subscriptions.forEach(subscription => subscription.unsubscribe());
	}
}
