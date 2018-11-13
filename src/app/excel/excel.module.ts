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
	MatTabsModule,
	MatProgressBarModule
} from '@angular/material';
import { HeaderModule } from '../header/header.module';

import { ExcelComponent} from './excel.component';
import { ExcelUploadComponent} from './excel-upload/excel-upload.component';
import { ExcelListComponent } from './excel-list/excel-list.component';
import { ExcelAgentComponent } from './excel-agent/excel-agent.component';

import { AuthGuardService } from '../shared/services/auth-guard.service';

import { NgUploaderModule } from 'ngx-uploader';

import { ProgressHttpModule } from "angular-progress-http";

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
				path: 'excel', component: ExcelComponent,
				canActivate: [AuthGuardService],
				children: [
					{path: '', component: ExcelUploadComponent},
					{path: 'list', component: ExcelListComponent},
					{path: 'agent', component: ExcelAgentComponent}
				]
			}
		] as Routes),
		NgUploaderModule,
		ProgressHttpModule,
		MatProgressBarModule,
	],
	declarations: [
		ExcelComponent,
		ExcelUploadComponent,
		ExcelListComponent,
		ExcelAgentComponent,
	],
	providers:[
		AuthGuardService,
	],
	exports:[
	]
})
export class ExcelModule { }
