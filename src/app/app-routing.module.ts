import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreatePlanComponent } from './components/create-plan/create-plan.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { TrainingComponent } from './components/training/training.component';
import { CreatePlanComponentModule } from './components/create-plan/create-plan.component-module';
import { RegistrationComponentModule } from './components/registration/registration.component-module';
import { LoginComponentModule } from './components/login/login.component-module';
import { TrainingComponentModule } from './components/training/training.component-module';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'create-plan', component: CreatePlanComponent },
      { path: 'register', component: RegistrationComponent },
      { path: 'login', component: LoginComponent },
      { path: 'plans', component: TrainingComponent },
    ]),
    CreatePlanComponentModule,
    RegistrationComponentModule,
    LoginComponentModule,
    TrainingComponentModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
