import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {
	MatTableModule,
	MatSortModule,
	MatButtonModule,
	MatIconModule
} from '@angular/material';
import { HeaderModule } from '../header/header.module';

import { DataSourceComponent} from './datasource.component';

import { AuthGuardService } from '../shared/services/auth-guard.service';

@NgModule({
	imports: [
		CommonModule,
		MatTableModule,
		MatSortModule,
		MatButtonModule,
		MatIconModule,
		HeaderModule,
		RouterModule.forChild([
			{
				path: 'datasource', component: DataSourceComponent,
				canActivate: [AuthGuardService]
			}
    	] as Routes),

	],
	declarations: [
		DataSourceComponent,
	],
	providers:[
		AuthGuardService
	],
	exports:[
	]
})
export class DataSourceModule { }
