import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../shared/services/auth.service';
import { MessagesService } from '../shared/services/messages.service';

import { environment } from '../../environments/environment';

import { User }           from '../shared/models/user.model';

declare var $:any;

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.component.html',
  styleUrls: ['auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  user : User;

  loading = false;
  error = '';
  isLogged = false;
  isLogging = true;
  
  private _subscriptions: Subscription[] = [];

  constructor(
    public auth: AuthService,
    public router: Router,
    private messagesService: MessagesService,
  ) {

    this.user = new User("","","",true);
  }

  ngOnInit(): void {
    this.isLogged = this.auth.isAuthenticated();
  }

  closeMenu() {
    $(".responsive-menu-close").trigger("click");
  }

    /*************************************
     JWT REQUESTS
    ***************************************/
    login() {
      this.loading = true;
      this.error = "";

      this.auth.login(this.user)
          .subscribe(
            success => {
              this.isLogged = true;
              this.goHome();
              // this.loading = false;
            },
            err  => {
              this.error = err._body;
              this.loading = false;
          });
    }

    register() {
      this.loading = true;
      this.error = "";
      
      this.auth.register(this.user)
          .subscribe(
            success => {
              // this.loading = false;
              this.isLogged = true;
              this.goHome();
            },
            err => {
              this.error = 'username or password is incorrect';
              this.loading = false;
            }
          );
    }

    logout(): void {
      localStorage.removeItem('currentUser');
      this.isLogged = false;
      this.router.navigate(['']);
    }

    goHome() {
      this.router.navigate(['home']);
    }

    ngOnDestroy() {
      this._subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
