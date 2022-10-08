import { BaseEntity } from './base.entity';

export enum CardType {
  SAVE = 'SAVE',
  EDIT = 'EDIT',
  VIEW = 'VIEW',
  MODIFY_ALL = 'MODIFY_ALL',
}

export interface Card extends BaseEntity {
  type: CardType;
}
