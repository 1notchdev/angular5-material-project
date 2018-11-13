import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {
	MatTableModule,
	MatSortModule,
	MatButtonModule,
	MatIconModule,
	MatPaginatorModule
} from '@angular/material';
import { HeaderModule } from '../header/header.module';

import { HomeComponent} from './home.component';

import { AuthGuardService } from '../shared/services/auth-guard.service';
import { ModelsService } from '../shared/services/models.service';

import { FetchModelsService } from '../shared/resolvers/fetch-models.service';

@NgModule({
	imports: [
		CommonModule,
		MatTableModule,
		MatSortModule,
		MatButtonModule,
		MatIconModule,
		MatPaginatorModule,
		HeaderModule,
		RouterModule.forChild([
			{
				path: 'home', component: HomeComponent, resolve: { models: FetchModelsService},
				canActivate: [AuthGuardService]
			}
    	] as Routes),

	],
	declarations: [
		HomeComponent
	],
	providers:[
		AuthGuardService,
		ModelsService,
		FetchModelsService
	],
	exports:[
	]
})
export class HomeModule { }
