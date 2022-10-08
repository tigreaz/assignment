import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { AppState } from '@app/reducers';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { finalize, map, filter, tap } from 'rxjs/operators';
import { CardType, Card } from '../@shared';
import {
  addNewUser,
  deleteUser,
  deleteAllUsers,
  saveAllUsersEdits,
  toggleUserActive,
  toggleAllUsersActive,
  saveUserUpdates,
} from './services/store/users.actions';
import { selectAllUsers, areUsersLoaded, allUsersActive } from './services/store/users.selectors';
import { Update } from '@ngrx/entity';
import { User } from './models/user';
import { ActionCardComponent } from '@app/@shared/action-card/action-card.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  @ViewChildren('userNames') unames!: QueryList<ActionCardComponent>;
  cards$: Observable<Array<Card>> = this.store.pipe(
    select(selectAllUsers),
    filter((users) => !!users),
    map((users) => {
      return users.map((u) => {
        return {
          type: CardType.VIEW,
          name: u.userName,
          active: u.active,
        } as Card;
      });
    })
  );

  allUsersActive$: Observable<boolean> = this.store.pipe(select(allUsersActive));

  constructor(private store: Store<AppState>) {}

  ngOnInit() {}

  addUser(userName: string): void {
    this.store.dispatch(addNewUser({ userName }));
  }

  deleteCurrentUser(userName: string | undefined): void {
    if (userName) {
      this.store.dispatch(deleteUser({ userName }));
    }
  }

  deleteAllUsers() {
    this.store.dispatch(deleteAllUsers());
  }

  editCurrentUser(userName: string | undefined): void {
    if (userName) {
      this.store.dispatch(toggleUserActive({ userName }));
    }
  }

  editAllUsers(): void {
    this.store.dispatch(toggleAllUsersActive());
  }
  saveAllUsers() {
    const updates: Array<Update<Partial<User>>> = this.unames.map((v) => {
      return {
        id: <string>v.name,
        changes: { userName: v.controlName.value, active: false } as Partial<User>,
      };
    });
    this.store.dispatch(saveAllUsersEdits({ updates }));
  }

  saveEdits(userName: string | undefined, newUserName: string) {
    if (userName) {
      this.store.dispatch(saveUserUpdates({ userName, newUserName }));
    }
  }
}
