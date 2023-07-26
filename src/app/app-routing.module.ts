import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreatePlanComponent } from './components/create-plan/create-plan.component';
import { RegisterPage } from './pages/register/register.page';
import { LoginPage } from './pages/login/login.page';
import { UserPlansPage } from './pages/user-plans/user-plans.page';
import { UserListPage } from './pages/user-list/user-list.page';
import { UserDetailsPage } from './pages/user-details/user-details.page';
import { CreatePlanComponentModule } from './components/create-plan/create-plan.component-module';
import { RegisterPageModule } from './pages/register/register.page-module';
import { LoginPageModule } from './pages/login/login.page-module';
import { UserPlansPageModule } from './pages/user-plans/user-plans.page-module';
import { UserListPageModule } from './pages/user-list/user-list.page-module';
import { UserDetailsPageModule } from './pages/user-details/user-details.page-module';
import { CreatePlanUsersPageModule } from './pages/create-plan-users/create-plan-users.page-module';
import { CreatePlanUsersPage } from './pages/create-plan-users/create-plan-users.page';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'create-plan', component: CreatePlanUsersPage },
      { path: 'register', component: RegisterPage },
      { path: 'login', component: LoginPage },
      { path: 'plans', component: UserPlansPage },
      { path: 'users-list', component: UserListPage },
      { path: 'user/:userId', component: UserDetailsPage },
    ]),
    CreatePlanUsersPageModule,
    RegisterPageModule,
    LoginPageModule,
    UserPlansPageModule,
    UserListPageModule,
    UserDetailsPageModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
