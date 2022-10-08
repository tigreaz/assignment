import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map, max } from 'rxjs/operators';
import { users } from './users.mock';
import { User } from '@app/users/models/user';
import { ofEntityOp } from '@ngrx/data';

@Injectable()
export class MockApiResultsInterceptor implements HttpInterceptor {
  currentUsers = users;
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.method === 'PUT' && request.body) {
      const existingUser = this.currentUsers.find((user) => user.userName === request.body);
      let newUser: unknown = undefined;
      if (!existingUser) {
        const userIds = this.currentUsers.map((user: User) => Number(user.id));
        const id = (Math.max(...userIds) + 1).toString();
        newUser = { userName: request.body, id } as User;
        this.currentUsers.push(newUser as User);
      }

      if (newUser) {
        return of(null).pipe(
          delay(2000),
          map(() => new HttpResponse({ status: 201, body: !!existingUser ? existingUser : newUser }))
        );
      }
    }

    if (request.method === 'GET' && request.url.includes('/api/User')) {
      const body = {
        results: JSON.stringify({
          users: this.currentUsers,
        }),
      };
      return of(null).pipe(
        delay(2000),
        map(() => new HttpResponse({ status: 200, body }))
      );
    }

    if (request.method === 'POST' && request.url.includes('/api/Users')) {
      return of(null).pipe(
        delay(2000),
        map(() => new HttpResponse({ status: 204 }))
      );
    }

    if (request.method === 'DELETE' && request.url.includes('/api/User')) {
      return of(null).pipe(
        delay(2000),
        map(() => new HttpResponse({ status: 204 }))
      );
    }

    if (request.method === 'DELETE' && request.url.includes('/api/Users')) {
      return of(null).pipe(
        delay(2000),
        map(() => new HttpResponse({ status: 204 }))
      );
    }

    if (request.method === 'PATCH' && request.url.includes('/api/User')) {
      return of(null).pipe(
        delay(2000),
        map(() => new HttpResponse({ status: 201 }))
      );
    }

    if (request.method === 'PATCH' && request.url.includes('/api/Users')) {
      return of(null).pipe(
        delay(2000),
        map(() => new HttpResponse({ status: 201 }))
      );
    }

    throw new HttpErrorResponse({ status: 500 });
  }
}
