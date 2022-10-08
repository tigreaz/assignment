import { BaseEntity } from '@app/@shared/models/base.entity';

export interface User extends BaseEntity {
  photo: string;
  externalId: string;
  orderNo: number;
  url: string;
  userName: string;
  firstName: string;
  lastName: string;
  iconUrl: string;
  email: string;
  description: string;
  longDescription?: string;
  userType: string;
}

export function userSorter(userA: User, userB: User) {
  return userA.userName.localeCompare(userB.userName);
}
