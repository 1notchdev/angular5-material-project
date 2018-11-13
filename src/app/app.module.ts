/*******************************************************************************************************
  GENERAL MODULES
****************************************************************************************************************** */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http } from '@angular/http/src/http';
import { JwtModule } from '@auth0/angular-jwt';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

/*******************************************************************************************************
  CUSTOM MODULES
****************************************************************************************************************** */
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routings';

/*******************************************************************************************************
  COMPONENTS
****************************************************************************************************************** */
import { AppComponent } from './app.component';

/*************************************************************************************************************
  PIPES
***************************************************************************************************** */
import { DatePipe } from '@angular/common';

/*************************************************************************************************************
  MODULE DECLARATION
***************************************************************************************************** */

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        /*
        tokenGetter: () => {
          return localStorage.getItem('currentUser');
        },*/
        whitelistedDomains: ['localhost:3001']
      }
    }),
    SimpleNotificationsModule.forRoot(),
    LoadingBarRouterModule,
    NgbModule.forRoot(),
    NgSelectModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [
    DatePipe,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
