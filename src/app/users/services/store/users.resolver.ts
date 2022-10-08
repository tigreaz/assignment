import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from '../../../reducers';
import { select, Store } from '@ngrx/store';
import { finalize, first, tap } from 'rxjs/operators';
import { loadAllUsers } from './users.actions';
import { areUsersLoaded } from './users.selectors';

@Injectable()
export class UsersResolver implements Resolve<any> {
  loading = false;

  constructor(private store: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store.pipe(
      select(areUsersLoaded),
      tap((usersLoaded) => {
        if (!usersLoaded) {
          this.loading = true;
          this.store.dispatch(loadAllUsers());
        }
      }),
      first(),
      finalize(() => (this.loading = false))
    );
  }
}
