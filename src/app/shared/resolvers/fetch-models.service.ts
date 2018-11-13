import { Injectable }     from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { environment } from '../../../environments/environment';

import { ModelsService } from '../../shared/services/models.service';

import { Model }           from '../../shared/models/model.model';

@Injectable()

export class FetchModelsService implements Resolve<any> {

  constructor(
    private modelsService: ModelsService,
    private router: Router,
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Model[]> | boolean {
    var params = route.params;
    return this.modelsService.getList();
  }
}