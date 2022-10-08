import { TestBed, fakeAsync } from '@angular/core/testing';
import * as actions from './users.actions';
import { usersReducer, UsersState, initialUsersState } from './user.reducers';
import { users as MOCK_USERS } from '@app/@shared/http/users.mock';
import { Action } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';

export const mock_initial_state = {
  ids: [],
  entities: {},
  allUsersLoaded: true,
  usersLoading: false,
  allUsersActive: false,
};

export const mock_state = {
  ids: ['kolson', 'landerson', 'mchoi', 'rmaya', 'scarlsman', 'srogers', 'upeterson'],
  entities: {
    kolson: {
      id: '4',
      photo: '/www/kolson.jpg',
      externalId: 'CA47-1067-B31D-00DD01066207',
      orderNo: 4,
      url: '',
      userName: 'kolson',
      firstName: 'Kate',
      lastName: 'Olson',
      iconUrl: '',
      email: '',
      description: '',
      longDescription: '',
      userType: 'Owner',
      active: false,
    },
    landerson: {
      id: '11',
      photo: '/www/landerson.jpg',
      externalId: 'CA47-1067-B31D-00DD01066205',
      orderNo: 8,
      url: '',
      userName: 'landerson',
      firstName: 'Larry',
      lastName: 'Anderson',
      iconUrl: '',
      email: '',
      description: '',
      longDescription: '',
      userType: 'security',
      active: false,
    },
    mchoi: {
      id: '2',
      photo: '/www/mchoi.jpg',
      externalId: 'CA47-1067-B31D-00DD01066204',
      orderNo: 9,
      url: '',
      userName: 'mchoi',
      firstName: 'Marry',
      lastName: 'Choi',
      iconUrl: '',
      email: '',
      description: '',
      longDescription: '',
      userType: 'security',
      active: false,
    },
    rmaya: {
      id: '5',
      photo: '/www/rmaya.jpg',
      externalId: 'CA47-1067-B31D-00DD01066206',
      orderNo: 5,
      url: '',
      userName: 'rmaya',
      firstName: 'Rhea',
      lastName: 'Maya',
      iconUrl: '',
      email: '',
      description: '',
      longDescription: '',
      userType: 'security',
      active: false,
    },
    scarlsman: {
      id: '3',
      photo: '/www/srogers.jpg',
      externalId: 'CA47-1067-B31D-00DD01066203',
      orderNo: 2,
      url: '',
      userName: 'scarlsman',
      firstName: 'Sean',
      lastName: 'Carlsman',
      iconUrl: '',
      email: '',
      description: '',
      longDescription: '',
      userType: 'security',
      active: false,
    },
    srogers: {
      id: '5',
      photo: '/www/srogers.jpg',
      externalId: 'CA47-1067-B31D-00DD01066202',
      orderNo: 3,
      url: '',
      userName: 'srogers',
      firstName: 'Sam',
      lastName: 'Rogers',
      iconUrl: '',
      email: 'srogers@amazon.com',
      description: '',
      longDescription: '',
      userType: 'employee',
      active: false,
    },
    upeterson: {
      id: '1',
      photo: '/www/upeterson.jpg',
      externalId: 'CA47-1067-B31D-00DD01066201',
      orderNo: 1,
      url: '',
      userName: 'upeterson',
      firstName: 'User',
      lastName: 'Peterson',
      iconUrl: '',
      email: 'upeterson@state.gov',
      description: 'nice guy',
      longDescription: 'sometimes not as nice',
      userType: 'employee',
      active: false,
    },
  },
  allUsersLoaded: true,
  usersLoading: true,
  allUsersActive: false,
};

describe('Store - users reducer', () => {
  const fullState: UsersState = { ...mock_initial_state };
  let mock_entities: any;

  beforeEach(() => (mock_entities = { ...mock_state.entities }));

  it('should use initial state', () => {
    expect(usersReducer(undefined, {} as Action)).toEqual(initialUsersState);
  });

  describe('allUsersLoadedSuccess reducer', () => {
    const action: Action = {
      type: '[Users Resolver] Load All Users',
    };
    const expected = { ...fullState };
    expected.usersLoading = false;

    it('should set isLoading without changing other properties', () => {
      expect(usersReducer(fullState, action)).toEqual(expected);
    });
  });

  describe('allUsersLoadedFailure reducer', () => {
    const action = {
      type: '[Load Users Effect] All Users LoadedFailure',
      users: [],
    };
    const currentState = { ...fullState };
    currentState.allUsersLoaded = true;
    const expected = { ...fullState };
    expected.allUsersLoaded = false;
    expected.usersLoading = false;

    it('should set isLoading and error  without changing other properties', () => {
      expect(usersReducer(currentState, action)).toEqual(expected);
    });
  });

  describe('allUsersLoadedSuccess reducer', () => {
    const characterList = fullState.entities;
    const action = {
      type: '[Load Users Effect] All Users LoadedSuccess',
      users: [],
    };
    const currentState = { ...fullState };
    currentState.usersLoading = true;
    currentState.entities = {};
    const expected = { ...fullState };
    expected.usersLoading = false;

    it('should set isLoading and films without changing other properties', () => {
      expect(usersReducer(currentState, action)).toEqual(expected);
    });
  });
});
