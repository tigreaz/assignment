export interface BaseEntity {
  id?: string;
  name?: string;
  mode?: 'EDIT' | 'VIEW';
  active?: boolean;
}
