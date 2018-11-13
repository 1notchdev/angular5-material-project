import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {
	MatButtonModule,
	MatIconModule,
} from '@angular/material';
import { HeaderModule } from '../header/header.module';

import { TermsComponent} from './terms.component';

import { AuthGuardService } from '../shared/services/auth-guard.service';

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatIconModule,
		HeaderModule,
		RouterModule.forChild([
			{
				path: 'terms', component: TermsComponent,
				canActivate: [AuthGuardService],
				children: [
				]
			}
		] as Routes),

	],
	declarations: [
		TermsComponent
	],
	providers:[
		AuthGuardService
	],
	exports:[
	]
})
export class TermsModule { }
