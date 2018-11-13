import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	MatFormFieldModule,
	MatInputModule,
	MatButtonModule,
	MatIconModule,
} from '@angular/material';
import { HeaderModule } from '../header/header.module';

import { SupportComponent} from './support.component';

import { AuthGuardService } from '../shared/services/auth-guard.service';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
		HeaderModule,
		RouterModule.forChild([
			{
				path: 'support', component: SupportComponent,
				canActivate: [AuthGuardService],
				children: [
				]
			}
		] as Routes),

	],
	declarations: [
		SupportComponent
	],
	providers:[
		AuthGuardService
	],
	exports:[
	]
})
export class SupportModule { }
