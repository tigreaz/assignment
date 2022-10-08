import { User } from '../../models/user';
import { Store, StoreModule } from '@ngrx/store';
import { users as mock_users } from '@app/@shared/http/users.mock';
import { loadedUserMapper, sortByName, UsersState } from './user.reducers';
import { selectAllUsers } from './users.selectors';
import { mock_state } from './user.reducers.spec';
import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

describe('All Users selector', () => {
  let store: any;
  let mockStore: MockStore<any>;
  let sortedUsers: Array<User>;
  let usersState: UsersState;
  beforeAll(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule],
      providers: [provideMockStore()],
    });
    store = TestBed.inject(Store);
    sortedUsers = loadedUserMapper(mock_users.sort(sortByName));
  });

  beforeEach(() => {
    usersState = { ...mock_state };
  });

  describe('selectAllUsers', () => {
    it('should return all users', () => {
      sortedUsers.map((user) => {
        return { ...user };
      });

      expect(selectAllUsers.projector(usersState)).toEqual(sortedUsers);
    });

    it('should return call the selectAllUsers', () => {
      jest.spyOn(store, 'select');
      store.select(selectAllUsers);
      expect(store.select).toHaveBeenCalledWith(selectAllUsers);
    });
  });
});
