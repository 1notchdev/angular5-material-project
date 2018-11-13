import { Injectable } from '@angular/core';
import { Headers, RequestOptions,ResponseContentType } from '@angular/http';
import { HttpInterceptor } from "../../shared/services/http-interceptor"
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { AuthService } from '../../shared/services/auth.service';

@Injectable()
export class HeadersService {

    token:string;
  
    constructor(
        private http: HttpInterceptor,
        public auth: AuthService,
        ) {
    }

    getJSONNoAuth(){
        return new RequestOptions({ headers: new Headers({
            'Content-Type': 'application/json',
          }) });
    }

    getWithAuth(){
        return new RequestOptions({ headers: new Headers({
            'Authorization': 'JWT ' + this.auth.token,
          }) });
    }

    getPicWithAuth(){
        return new RequestOptions({headers: new Headers({
                'Authorization': 'JWT ' + this.auth.token,
            }),
            responseType: ResponseContentType.Blob 
        });
    }

    getJSONWithAuth(){
        return new RequestOptions({ headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + this.auth.token,
          }) });
    }

    postJSONNoAuth(){
        return new RequestOptions({ headers: new Headers({
            'Content-Type': 'application/json',
          })});
    }

    postJSONWithAuth(){
        return new RequestOptions({ headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + this.auth.token,
          }) });
    }
}