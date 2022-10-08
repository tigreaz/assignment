import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { map, catchError, first } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UsersHttpService {
  constructor(private http: HttpClient) {}

  findAllUsers(): Observable<User[]> {
    return this.http.get('/Users').pipe(
      map((res) => {
        const results: string = res?.['results'];
        if (results) {
          const parsed = JSON.parse(results);
          const { users } = parsed;
          return users;
        }
        return [];
      })
    );
  }

  findUserByUrl(UserUrl: string): Observable<User> {
    return this.http.get<User>(`/Users/${UserUrl}`);
  }

  createNewUser(userName: string): Observable<User> {
    return this.http.put('/User', userName).pipe(
      first((v) => !!v),
      map((user) => {
        return user as User;
      }),
      catchError((error) => {
        throw error;
      })
    );
  }

  saveUser(userId: string | number, newUserName: string) {
    return this.http.patch('/User/' + userId, { userName: newUserName });
  }

  deleteUser(userId: string) {
    return this.http.delete(`/User/${userId}`);
  }

  updateAll(updatedUsers: Array<Partial<User>>) {
    const users: string = updatedUsers.join(',');
    return this.http.post('/Users', { users });
  }

  deleteAllUsers() {
    return this.http.delete(`/Users}`);
  }
}
