import { TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { TestScheduler } from 'rxjs/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, Store } from '@ngrx/store';
import { firstValueFrom, Observable, of, throwError, forkJoin } from 'rxjs';
import { first } from 'rxjs/operators';
import { hot, cold } from 'jasmine-marbles';
import { UsersHttpService } from '../users-http.service';
import { users as MOCK_USERS } from '@app/@shared/http/users.mock';
import { UsersEffects } from './users.effects';
import * as actions from './users.actions';
import * as reducer from './user.reducers';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { provideMockStore } from '@ngrx/store/testing';
import { User } from '@app/users/models/user';

const testScheduler = new TestScheduler((actual, expected) => {
  return JSON.stringify(actual) === JSON.stringify(expected);
});

describe('Store - users effects', () => {
  let effects: UsersEffects;
  let actions$: Observable<Action>;
  let httpService: any;
  let userFinderSpy: any;
  let httpClient: any;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        UsersEffects,
        provideMockStore({}),
        { provide: HttpHandler, useValue: {} },
        HttpClient,
        provideMockActions(() => actions$),
        UsersHttpService,
      ],
    });
    effects = TestBed.inject(UsersEffects);
    httpService = TestBed.inject(UsersHttpService);
    httpClient = TestBed.inject(HttpClient);
    userFinderSpy = jest.spyOn(httpService, 'findAllUsers');
  }));

  describe('loadUsers$', () => {
    let successData: { users: User[] };
    beforeEach(fakeAsync(() => {
      successData = { users: MOCK_USERS.sort(reducer.sortByName) };
    }));

    afterEach(fakeAsync(() => {
      userFinderSpy = null;
    }));

    it('should dispatch the proper success action', fakeAsync(() => {
      actions$ = cold('--a', { a: actions.loadAllUsers() });
      userFinderSpy = jest.spyOn(httpService, 'findAllUsers').mockReturnValue(of(successData));
      const expected$ = hot('--(z-)', { z: actions.allUsersLoadedSuccess(successData) });
      const loadSuccess$ = cold('--s', { s: successData });
      const joined$ = forkJoin([expected$.pipe(first()), expected$.pipe(first())]);
      const r = firstValueFrom(joined$);
      r.then(([exp, re]) => {
        return testScheduler.assertDeepEqual(exp, re);
      });
    }));

    it('should dispatch the proper error action', fakeAsync(() => {
      const error = hot('--c-', actions.allUsersLoadedFailure());
      userFinderSpy = jest.spyOn(httpService, 'findAllUsers').mockReturnValue(throwError(() => error));
      actions$ = cold('--m-', { m: actions.loadAllUsers() });
      const expectedError = cold(
        '--(#)',
        { c: actions.allUsersLoadedFailure() },
        { type: '[Load Users Effect] All Users LoadedFailure' }
      );
      expect(effects.loadUsers$).toBeObservable(expectedError);
    }));
  });
});
