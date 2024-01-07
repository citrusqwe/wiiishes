import {Route} from "@angular/router";
import {UsersComponent} from "./components/users/users.component";

export default [{
  path: '', component: UsersComponent,
}] satisfies Route[];
