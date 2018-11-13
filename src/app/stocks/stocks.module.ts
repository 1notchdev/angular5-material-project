import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {
	MatTableModule,
	MatSortModule,
	MatButtonModule,
	MatIconModule,
	MatSlideToggleModule,
	MatTabsModule
} from '@angular/material';
import { HeaderModule } from '../header/header.module';

import { StocksComponent} from './stocks.component';
import { StocksListComponent} from './stocks-list/stocks-list.component';
import { StocksAgentComponent} from './stocks-agent/stocks-agent.component';


import { AuthGuardService } from '../shared/services/auth-guard.service';
import { StocksService } from '../shared/services/stocks.service';
import { FetchStocksService } from '../shared/resolvers/fetch-stocks.service';

@NgModule({
	imports: [
		CommonModule,
		MatTableModule,
		MatSortModule,
		MatButtonModule,
		MatIconModule,
		MatSlideToggleModule,
		MatTabsModule,
		HeaderModule,
		RouterModule.forChild([
			{
				path: 'stocks', component: StocksComponent,
				canActivate: [AuthGuardService],
				children: [
					{path: '', component: StocksListComponent, resolve: {stocks: FetchStocksService}},
					{path: 'agent', component: StocksAgentComponent}
				]
			}
		] as Routes),

	],
	declarations: [
		StocksComponent,
		StocksListComponent,
		StocksAgentComponent
	],
	providers:[
		AuthGuardService,
		StocksService,
		FetchStocksService
	],
	exports:[
	]
})
export class StocksModule { }
