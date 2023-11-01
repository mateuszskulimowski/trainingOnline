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
import { TrainingDetailsPage } from './pages/training-details/training-details.page';
import { TrainingDetailsPageModule } from './pages/training-details/training-details.page-module';
import { HomePage } from './pages/home/home.page';
import { HomePageModule } from './pages/home/home.page-module';
import { IsNotLoggedInGuardModule } from './guards/is-not-logged-in.guard-module';
import { IsNotLoggedInGuard } from './guards/is-not-logged-in.guard';
import { IsAdminGuard } from './guards/is-admin.guard';
import { IsAdminGuardModule } from './guards/is-admin.guard-module';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'create-plan',
        component: CreatePlanUsersPage,
        canActivate: [AngularFireAuthGuard, IsAdminGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
      },
      { path: 'register', component: RegisterPage },
      { path: 'login', component: LoginPage },
      {
        path: 'users-list',
        component: UserListPage,
        canActivate: [AngularFireAuthGuard, IsAdminGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
      },
      {
        path: 'user/:userId',
        component: UserDetailsPage,
        canActivate: [AngularFireAuthGuard, IsAdminGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
      },
      {
        path: 'create-plan/:authId',
        component: CreatePlanUsersPage,
        canActivate: [AngularFireAuthGuard, IsAdminGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
      },
      {
        path: 'training-plans',
        component: TrainingPlansPage,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
      },
      {
        path: 'training-plans/:authId',
        component: TrainingPlansPage,
        canActivate: [AngularFireAuthGuard, IsAdminGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
      },
      {
        path: 'edit-plan/:authId/:trainingId',
        component: EditPlanPage,
        canActivate: [AngularFireAuthGuard, IsAdminGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
      },
      {
        path: 'training/:trainingId',
        component: TrainingDetailsPage,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
      },
      { path: '', component: HomePage },
      {
        path: 'home',
        component: HomePage,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
      },
    ]),
    CreatePlanUsersPageModule,
    RegisterPageModule,
    LoginPageModule,
    UserListPageModule,
    UserDetailsPageModule,
    TrainingPlansPageModule,
    EditPlanPageModule,
    TrainingDetailsPageModule,
    HomePageModule,
    IsNotLoggedInGuardModule,
    IsAdminGuardModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
