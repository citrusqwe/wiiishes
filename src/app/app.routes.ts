import {Routes} from "@angular/router";
import {LayoutComponent} from "./ui/layout/layout.component";
import {authGuardAuthorized, authGuardNotAuthorized} from "./shared/guards/auth/auth.guard";
import {AuthLayoutComponent} from "./ui/auth-layout/auth-layout.component";

export const ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuardNotAuthorized],
    children: [
      {
        path: 'wishes',
        loadChildren: () => import('./features/wishes/wishes.routes'),
      },
      {
        path: 'gifts',
        loadChildren: () => import('./features/gifts/gifts.routes'),
      },
      {
        path: 'users',
        loadChildren: () => import('./features/users/users.routes'),
      },
      {
        path: '', pathMatch: 'full', redirectTo: 'wishes'
      },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate: [authGuardAuthorized],
    loadChildren: () => import('./features/auth/auth.routes'),
  },
];