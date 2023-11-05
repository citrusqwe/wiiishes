import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AuthPageComponent} from "./components/auth-page/auth-page.component";
import {SignupPageComponent} from "./components/signup-page/signup-page.component";
import {LoginPageComponent} from "./components/login-page/login-page.component";

const routes: Routes = [{
  path: '', component: AuthPageComponent, children: [
    {
      path: 'signup', component: SignupPageComponent
    },
    {
      path: 'login', component: LoginPageComponent
    },
    {
      path: '', pathMatch: 'full', redirectTo: 'login'
    },
  ]
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
