import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { Shell } from '@app/shell/shell.service';
import { UsersResolver } from './services/store/users.resolver';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: '',
      redirectTo: '/users',
      pathMatch: 'full',
      resolve: {
        courses: UsersResolver,
      },
    },
    {
      path: 'users',
      component: UsersComponent,
      resolve: {
        courses: UsersResolver,
      },
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class UsersRoutingModule {}
