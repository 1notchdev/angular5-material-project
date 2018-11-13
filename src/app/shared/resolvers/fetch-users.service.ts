import { Injectable }     from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { environment } from '../../../environments/environment';
import { User } from '../../shared/models/user.model';
import { UsersService } from '../../shared/services/users.service';

import { Observable } from 'rxjs/Rx';

@Injectable()

export class FetchUsersService implements Resolve<any> {

  constructor(
    private usersService: UsersService,
    private router: Router,

  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<User[]> | boolean {
    var params = route.params;
    return this.usersService.get();
  }

}