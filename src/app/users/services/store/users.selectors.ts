import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './user.reducers';
import * as fromUsers from './user.reducers';

export const selectUsersState = createFeatureSelector<UsersState>('users');

export const selectAllUsers = createSelector(selectUsersState, fromUsers?.selectAll);

export const areUsersLoaded = createSelector(selectUsersState, (state) => !!state?.allUsersLoaded);

export const allUsersActive = createSelector(selectUsersState, (state) => !!state?.allUsersActive);
