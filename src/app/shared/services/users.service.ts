import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { environment } from '../../../environments/environment';

import { MessagesService } from '../../shared/services/messages.service';
import { AuthService } from '../../shared/services/auth.service';
import { HttpInterceptor } from "../../shared/services/http-interceptor"
import { NotificationsService } from 'angular2-notifications';

import { User }           from '../../shared/models/user.model';

import { HeadersService } from '../../shared/services/headers.service';

@Injectable()
export class UsersService {
  
    public user: User;

    text_error : string;
    text_success : string;
    text_warning : string;

    constructor(
        private http: HttpInterceptor,
        private auth: AuthService,
        private messagesService: MessagesService,
        private notificationsService: NotificationsService,
        private headersService: HeadersService,
    ) {}

    get(): Observable<User[]> {

        let url = environment.apiUrl+"/users";
        let options = this.headersService.getWithAuth();

        // get users from api
        return this.http.get(url,options)
                .map((response: any) => {
                    // login successful if there's a jwt token in the response
                    let users = response.json();
                    if (users) {
                        let users = <User[]>response.json();
                        this.user = users[0];
                        return users;
                    } else {
                        return [];
                    }
                })
                .catch((error: any) => {
                    // Check if type error is server (50x) or unauthorized (40x)
                    var type_error  = error.status.toString()[0];
                    this.text_error = type_error != 5 ? error._body : environment.msgErrors.server;
                    this.notificationsService.error(
                        '&nbsp;',
                        this.text_error,
                        {
                            timeOut: 3000,
                            pauseOnHover: false,
                            clickToClose: false,
                        }
                    );
                    if (error.status === 401 || error.status === "401" ) {
                        this.sendMessage({ error_user:this.text_error });
                    }
                    return Observable.throw(new Error(error.status));
                });
    }

    edit(user) : Observable<boolean> {

        let url = environment.apiUrl+"/users/edit";
        let options = this.headersService.postJSONWithAuth();

        return this.http.post(url, JSON.stringify(user),options)
                .map((response: any) => {
                    return true;
                })
                .catch((error: any) => {
                    // Check if type error is server (50x) or unauthorized (40x)
                    var type_error  = error.status.toString()[0];
                    this.text_error = type_error != 5 ? error._body : environment.msgErrors.server;
                    this.notificationsService.error(
                        '&nbsp;',
                        this.text_error,
                        {
                            timeOut: 3000,
                            pauseOnHover: false,
                            clickToClose: false,
                        }
                    );
                    if (error.status === 401 || error.status === "401" ) {
                        this.sendMessage({ error_user:this.text_error });
                    }
                    return Observable.throw(new Error(error.status));
                });
    }

    sendMessage(message): void {
        this.messagesService.sendMessage(message);
    }

    clearMessage(): void {
        this.messagesService.clearMessage();
    }
}


  
