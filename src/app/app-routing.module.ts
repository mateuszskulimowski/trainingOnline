import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreatePlanUsersPage } from './pages/create-plan-users/create-plan-users.page';
import { RegisterPage } from './pages/register/register.page';
import { LoginPage } from './pages/login/login.page';
import { UserListPage } from './pages/user-list/user-list.page';
import { UserDetailsPage } from './pages/user-details/user-details.page';
import { TrainingPlansPage } from './pages/user-plans/training-plans.page';
import { CreatePlanUsersPageModule } from './pages/create-plan-users/create-plan-users.page-module';
import { RegisterPageModule } from './pages/register/register.page-module';
import { LoginPageModule } from './pages/login/login.page-module';
import { UserListPageModule } from './pages/user-list/user-list.page-module';
import { UserDetailsPageModule } from './pages/user-details/user-details.page-module';
import { TrainingPlansPageModule } from './pages/user-plans/training-plans.page-module';
import { EditPlanPage } from './pages/edit-plan/edit-plan.page';
import { EditPlanPageModule } from './pages/edit-plan/edit-plan.page-module';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'create-plan', component: CreatePlanUsersPage },
      { path: 'register', component: RegisterPage },
      { path: 'login', component: LoginPage },
      { path: 'users-list', component: UserListPage },
      { path: 'user/:userId', component: UserDetailsPage },
      { path: 'create-plan/:userId', component: CreatePlanUsersPage },
      { path: 'training-plans', component: TrainingPlansPage },
      { path: 'training-plans/:userId', component: TrainingPlansPage },
      { path: 'edit-plan/:userId/:trainingId', component: EditPlanPage },
    ]),
    CreatePlanUsersPageModule,
    RegisterPageModule,
    LoginPageModule,
    UserListPageModule,
    UserDetailsPageModule,
    TrainingPlansPageModule,
    EditPlanPageModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
