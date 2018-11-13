import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	MatTableModule,
	MatSortModule,
	MatButtonModule,
	MatIconModule,
	MatSlideToggleModule,
	MatTabsModule
} from '@angular/material';
import { HeaderModule } from '../header/header.module';

import { CryptoComponent} from './crypto.component';
import { CryptoListComponent} from './crypto-list/crypto-list.component';
import { CryptoAgentComponent } from './crypto-agent/crypto-agent.component';
import { AuthGuardService } from '../shared/services/auth-guard.service';

import { CryptosService } from '../shared/services/cryptos.service';

import { FetchCryptosService } from '../shared/resolvers/fetch-cryptos.service';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		MatTableModule,
		MatSortModule,
		MatButtonModule,
		MatIconModule,
		MatSlideToggleModule,
		MatTabsModule,
		HeaderModule,
		RouterModule.forChild([
			{
				path: 'crypto', component: CryptoComponent,
				canActivate: [AuthGuardService],
				children: [
					{path: '', component: CryptoListComponent, resolve: {cryptos: FetchCryptosService}},
					{path: 'agent', component: CryptoAgentComponent}
				]
			}
    	] as Routes),

	],
	declarations: [
		CryptoComponent,
		CryptoListComponent,
		CryptoAgentComponent
	],
	providers:[
		AuthGuardService,
		CryptosService,
		FetchCryptosService
	],
	exports:[
	]
})
export class CryptoModule { }
