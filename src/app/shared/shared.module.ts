import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/*************************************************************************************************************
  SERVICES
***************************************************************************************************** */
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { MessagesService } from './services/messages.service';
import { HttpInterceptor } from './services/http-interceptor';
import { HeadersService } from './services/headers.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers:[
    AuthService,
    UsersService,
    MessagesService,
    HttpInterceptor,
    HeadersService,
  ],
  declarations: [],
  exports: [
  ],
})
export class SharedModule { }
