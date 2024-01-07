import {Route} from "@angular/router";
import {AuthPageComponent} from "./components/auth-page/auth-page.component";
import {SignupPageComponent} from "./components/signup-page/signup-page.component";
import {LoginPageComponent} from "./components/login-page/login-page.component";

export default [{
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
}] satisfies Route[];
