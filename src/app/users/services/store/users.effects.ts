import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserActions } from './action-types';
import { UsersHttpService } from '../users-http.service';
import { of, Observable } from 'rxjs';
import { concatMap, map, tap, switchMap, catchError, first, withLatestFrom } from 'rxjs/operators';
import {
  allUsersLoadedSuccess,
  userAddedFailure,
  userAddedSuccess,
  userDeletedFailure,
  deleteAllUsersFailure,
  userUpdateFailure,
  toggleUserActive,
  allUsersLoadedFailure,
} from './users.actions';
import { Store } from '@ngrx/store';
import { AppState } from '@app/reducers';
import { User } from '../../models/user';
import { selectUsersState, selectAllUsers } from './users.selectors';

@Injectable({ providedIn: 'root' })
export class UsersEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadAllUsers),
      switchMap((action) => {
        return this.usersHttpService.findAllUsers().pipe(first((v) => !!v));
      }),
      map((users) => {
        const r = allUsersLoadedSuccess({ users });
        return {
          users: r.users,
          type: r.type,
        };
      }),
      catchError((error) => {
        throw allUsersLoadedFailure();
      })
    )
  );

  createNewUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.addNewUser),
        concatMap((action) => {
          return this.usersHttpService.createNewUser(action.userName).pipe(
            first((user) => !!user),
            tap((user: User) => this.store.dispatch(userAddedSuccess({ user: user }))),
            catchError((error) => {
              console.error(error);
              this.store.dispatch(userAddedFailure({ userName: action.userName }));
              return of(null);
            })
          );
        })
      ),
    { dispatch: false }
  );

  saveUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.saveUserUpdates),
        switchMap((action) => {
          return this.usersHttpService.saveUser(action.userName, action.newUserName).pipe(
            first((v) => !!v),
            catchError((error) => {
              throw userUpdateFailure();
            })
          );
        })
      ),
    { dispatch: false }
  );

  deleteUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.deleteUser),
        switchMap((action) => {
          return this.usersHttpService.deleteUser(action.userName).pipe(
            catchError((error) => {
              throw userDeletedFailure({ userName: action.userName });
            })
          );
        })
      ),
    { dispatch: false }
  );

  allUsers$: Observable<Array<User>> = this.store.select(selectAllUsers);

  deleteAllUsers$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.deleteAllUsers),
        withLatestFrom(this.allUsers$),
        switchMap(([action, allUsers]: [any, Array<User>]) => {
          return this.usersHttpService.deleteAllUsers().pipe(
            catchError((error) => {
              throw UserActions.deleteAllUsersFailure({ users: allUsers });
            })
          );
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private usersHttpService: UsersHttpService, private store: Store<AppState>) {}
}
