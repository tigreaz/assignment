import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user';
import { Update } from '@ngrx/entity';

export const loadAllUsers = createAction('[Users Resolver] Load All Users');

export const allUsersLoadedSuccess = createAction(
  '[Load Users Effect] All Users LoadedSuccess',
  props<{ users: User[] }>()
);

export const allUsersLoadedFailure = createAction('[Load Users Effect] All Users LoadedFailure');

export const saveUserUpdates = createAction(
  '[User Component] Save User Updates',
  props<{ userName: string; newUserName: string }>()
);

export const setUserUpdateActive = createAction(
  '[User Component] User Update Active',
  props<{ update: Update<User> }>()
);

export const userUpdateFailure = createAction('[Edit User Card] User UpdatedFailure');

export const addNewUser = createAction('[User Component] Add User', props<{ userName: string }>());

export const userAddedSuccess = createAction('[User Component] User Added Success', props<{ user: User }>());

export const userAddedFailure = createAction('[User Component] User Add Failed', props<{ userName: string }>());

export const deleteUser = createAction('[User Component] Delete User', props<{ userName: string }>());

export const userDeletedFailure = createAction('[User Component] User Deleted Failure', props<{ userName: string }>());

export const deleteAllUsers = createAction('[User Component] Delete All Users');

export const saveAllUsersEdits = createAction(
  '[User Component] Edit All Users',
  props<{ updates: Array<Update<Partial<User>>> }>()
);

export const deleteAllUsersFailure = createAction(
  '[Remove All Effect] Delete All Users Failed',
  props<{ users: User[] }>()
);

export const editAllUsersFailure = createAction('[Edit All Effect] All Users Edit Failed', props<{ users: User[] }>());

export const toggleUserActive = createAction(
  '[User Component], Set User Active for Update ',
  props<{ userName: string }>()
);

export const toggleAllUsersActive = createAction('[User Component], Set All Users Active for Update ');
