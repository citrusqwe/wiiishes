import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthPageComponent} from './components/auth-page/auth-page.component';
import {SignupPageComponent} from './components/signup-page/signup-page.component';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {SharedModule} from "../shared/shared.module";
import {AuthRoutingModule} from "./auth-routing.module";


@NgModule({
  declarations: [
    AuthPageComponent,
    SignupPageComponent,
    LoginPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,
  ],
})
export class AuthModule {
}
