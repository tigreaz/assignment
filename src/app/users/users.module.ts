import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import { SharedModule, AppMaterialModule } from '@shared';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UsersResolver } from './services/store/users.resolver';
import { UsersHttpService } from './services/users-http.service';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './services/store/users.effects';
import { StoreModule } from '@ngrx/store';
import { usersReducer } from './services/store/user.reducers';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule,
    AppMaterialModule,
    EffectsModule.forFeature([UsersEffects]),
    StoreModule.forFeature('users', usersReducer),
  ],
  declarations: [UsersComponent],
  providers: [UsersHttpService, UsersResolver],
})
export class UsersModule {
  constructor() {}
}
