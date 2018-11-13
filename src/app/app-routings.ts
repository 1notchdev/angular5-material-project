import { NgModule } from '@angular/core';
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';  
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule

} from '@angular/material';

/*******************************************************************************************************
  CUSTOM MODULES
****************************************************************************************************************** */
// import { FilesModule } from './analysis/analysis.module';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { DataSourceModule } from './datasource/datasource.module';
import { StocksModule } from './stocks/stocks.module';
import { CryptoModule } from './crypto/crypto.module';
import { ExcelModule } from './excel/excel.module';
import { TermsModule } from './terms/terms.module';
import { SupportModule } from './support/support.module';
import { NotFoundModule } from './not-found/not-found.module';

/*******************************************************************************************************
  COMPONENTS
****************************************************************************************************************** */
import { AuthComponent } from './auth/auth.component';
import { NotFoundComponent } from './not-found/not-found.component';

/*************************************************************************************************************
  RESOLVERS
***************************************************************************************************** */

const appRoutes: Routes = [
  { path: '',                                 component: AuthComponent,             },
  { path: '**',                               component: NotFoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    // FilesModule,
    AuthModule,
    HomeModule,
    DataSourceModule,
    StocksModule,
    CryptoModule,
    ExcelModule,
    TermsModule,
    SupportModule,
    NotFoundModule,
    MatButtonModule,
    FormsModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    AuthComponent,
    NotFoundComponent,
  ],
  providers:[
  ],
  exports: [
    // FilesModule,
    HomeModule,
    AuthModule,
    NotFoundModule,
    RouterModule
  ],
})
export class AppRoutingModule { }