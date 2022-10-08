import { userSorter, User } from '@app/users/models/user';
import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { UserActions } from './action-types';
import { allUsersLoadedFailure } from './users.actions';

export interface UsersState extends EntityState<User> {
  allUsersLoaded: boolean;
  usersLoading: boolean;
  allUsersActive: boolean;
}

export function userName(a: User): string {
  return a.userName;
}

export function sortByName(a: User, b: User): number {
  return a.userName.localeCompare(b.userName);
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: userName,
  sortComparer: sortByName,
});

export const initialUsersState = adapter.getInitialState({
  allUsersLoaded: false,
  usersLoading: true,
  allUsersActive: false,
});

export const loadedUserMapper = (users: Array<User>) =>
  users.map((user) => {
    return { ...user, active: false };
  });

export const usersReducer = createReducer(
  initialUsersState,
  on(UserActions.allUsersLoadedSuccess, (state, action) => {
    return adapter.addMany(loadedUserMapper(action.users), { ...state, allUsersLoaded: true, usersLoading: false });
  }),

  on(UserActions.allUsersLoadedFailure, (action) =>
    adapter.getInitialState({ ...initialUsersState, allUsersLoaded: false, usersLoading: false })
  ),

  on(UserActions.addNewUser, (state) => ({ ...state })),

  on(UserActions.userAddedSuccess, (state, action) => adapter.addOne(action.user, { ...state })),

  on(UserActions.saveUserUpdates, (state, { userName, newUserName }) =>
    adapter.map(
      (user) => (user.userName === userName ? { ...user, userName: newUserName, active: false } : user),
      state
    )
  ),
  on(UserActions.saveAllUsersEdits, (state, { updates }) =>
    adapter.updateMany(updates, { ...state, allUsersActive: !state.allUsersActive })
  ),
  on(UserActions.userUpdateFailure, (state, action) => ({ ...state })),
  on(UserActions.deleteUser, (state, { userName }) => adapter.removeOne(userName, state)),
  on(UserActions.deleteAllUsers, (state) => adapter.removeAll({ ...state, allUsersLoaded: true, usersLoading: false })),
  on(UserActions.deleteAllUsersFailure, (state, action) => {
    return adapter.addMany(action.users, { ...state, allUsersLoaded: true, usersLoading: false });
  }),
  on(UserActions.toggleUserActive, (state, { userName }) =>
    adapter.map((user) => (user.userName === userName ? { ...user, active: !user.active } : user), state)
  ),
  on(UserActions.toggleAllUsersActive, (state) =>
    adapter.map((user) => ({ ...user, active: !state.allUsersActive }), {
      ...state,
      allUsersActive: !state.allUsersActive,
    })
  )
);

export const { selectAll } = adapter.getSelectors();
