import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../shared/services/auth.service';
import { MessagesService } from '../shared/services/messages.service';

import { environment } from '../../environments/environment';

declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  loading = false;
  error = '';
  
  private _subscriptions: Subscription[] = [];

  constructor(
    public auth: AuthService,
    public router: Router,
    private messagesService: MessagesService,
  ) {
  }

  ngOnInit(): void {

    /*==========  Responsive Navigation  ==========*/
    $('.main-nav').children().clone().appendTo('.responsive-nav');
    $('.responsive-menu-open').on('click', function(event) {
      event.preventDefault();
      $('body').addClass('no-scroll');
      $('.responsive-menu').addClass('open');
      return false;
    });
    $('.responsive-menu-close').on('click', function(event) {
      event.preventDefault();
      $('body').removeClass('no-scroll');
      $('.responsive-menu').removeClass('open');
      return false;
    });
    $('.responsive-nav li').each(function(index) {
      if ($(this).find('ul').length) {
        var text = $(this).find('> a').text();
        var id = text.replace(/\s+/g, '-').toLowerCase();
        id = id.replace('&','');
        $(this).find('> a').attr('href', '#collapse-' + id);
        $(this).find('> a').attr('data-toggle', 'collapse');
        $(this).find('> a').append('<i class="fa fa-angle-down"></i>');
        $(this).find('> ul').attr('id', 'collapse-' + id);
        $(this).find('> ul').addClass('collapse');
      }
    });
    $('.responsive-nav a').on('click', function() {
      if ($(this).parent().hasClass('collapse-active')) {
        $(this).parent().removeClass('collapse-active');
      } else {
        $(this).parent().addClass('collapse-active');
      }
    });

  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  closeMenu() {
    $(".responsive-menu-close").trigger("click");
  }


  logout(){
    this.auth.logout();
  }
  
}