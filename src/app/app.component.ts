import { Component, HostListener, OnInit, OnDestroy  } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { environment } from './../environments/environment';

import { MessagesService } from './shared/services/messages.service';
import { AuthService } from './shared/services/auth.service';

declare var $:any;
declare var navigator: any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    private _routeScrollPositions: {[url: string] : number}[] = [];
    private _subscriptions: Subscription[] = [];

    isMobileView = false;

    userLang : string; 
    
    constructor(
        private router: Router,
        private messagesService: MessagesService,
        public auth: AuthService,
    ){

      this._subscriptions.push(
        this.messagesService.getMessage()
        .subscribe(message => {
          if(message.error_user){
            this.auth.logout();
            this.router.navigate(['']);
          } 
        })
      );
      
    }
  
  ngOnInit() {

      //==========  Disable Custom Dropdown on Mobile devices  ==========
      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        // the browser window is less than 768px
        this.isMobileView = true;
      } else {
        
      }
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}

