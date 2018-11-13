import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';

import { HttpInterceptor } from "../../shared/services/http-interceptor"

import { User }           from '../../shared/models/user.model';

@Injectable()
export class AuthService {

    token:string;
    user : User;
  
    constructor(
        private http: HttpInterceptor,
        public router: Router,
        ) {

            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
            this.token = currentUser && currentUser.token;
    }

    public isAuthenticated(): boolean {
        return localStorage.getItem('currentUser') !== null;
    }

    login(user): Observable<boolean> {

        let options = new RequestOptions({ 
            headers: new Headers({'Content-Type': 'application/json'})
        });
      
        return this.http.post(environment.apiUrl+"/auth", JSON.stringify(user),options)
        .map((response: any) => {
            {
                // login successful if there's a jwt token in the response
                let token = response.json();

                if (token) {
                    // set token property
                    this.token = token.access_token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: user.username, token: token.access_token }));

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            }
        });
        

    }

  register(user): Observable<boolean> {
    
    return this.http.post(environment.apiUrl+"/user", JSON.stringify(user))
    .map((response: any) => {
        // login successful if there's a jwt token in the response
        let token = response.json();
        if (token) {
            // set token property
            this.token = token.access_token;

            // store username and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify({ username: user.username, token: token.access_token }));

            // return true to indicate successful login
            return true;
        } else {
            // return false to indicate failed login
            return false;
        }
    })
  }

logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
    this.router.navigate(['']);
}

}


  
