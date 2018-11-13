import { Injectable }     from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable, Subject } from 'rxjs/Rx';

import { environment } from '../../../environments/environment.prod';

import { HttpInterceptor } from "../../shared/services/http-interceptor"
import { AuthService } from '../../shared/services/auth.service';
import { MessagesService } from '../../shared/services/messages.service';
import { NotificationsService } from 'angular2-notifications';

import { Model }           from '../../shared/models/model.model';

import { HeadersService } from '../../shared/services/headers.service';

@Injectable()

export class ModelsService {

  models : Model[];
  totalResults : number = 0;
  currentPage = new Subject<number>();

  sortBy : string = "Name";
  orderBy : string = "DESC";

  text_error : string;
  text_success : string;
  text_warning : string;

  constructor(
    public http: HttpInterceptor,
    public auth: AuthService,
    private messagesService: MessagesService,
    private notificationsService: NotificationsService,
    private headersService: HeadersService
  
  ) { }

  public getList() : Observable<Model[]> {

    let url = environment.apiUrl+"/models";
    let options = this.headersService.getWithAuth();

    return this.http.get(url,options) 
            .map((response: any) => {
              this.models = <Model[]>response.json().models;
              return this.models;
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
                return Observable.throw(new Error(error.status));
            });
  }

  public getSingle(ModelId) : Observable<Model> {

    let url = environment.apiUrl+"/single/"+ModelId;
    let options = this.headersService.getWithAuth();

    return this.http.get(url,options) 
            .map((response: any) => {
              let document = <Model>response.json().model;
              return document;
            })
            .catch((error: any) => this.handleError(error));
  }

  public create(model) : Observable<any> {

    let url = environment.apiUrl+"/models";
    let options = this.headersService.postJSONWithAuth();

    return this.http.post(url,JSON.stringify(model),options) 
            .map((response: any) => {
              let modelId = <any>response.json().Id;
              return modelId;
            })
            .catch((error: any) => this.handleError(error));
  }

  handleError(error) : Observable<Model> {
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
      return Observable.throw(new Error(error.status));
  }

}