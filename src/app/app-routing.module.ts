import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "./components/layout/layout.component";
import {AuthLayoutComponent} from "./components/auth-layout/auth-layout.component";
import {authGuardAuthorized, authGuardNotAuthorized} from "./guards/auth/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuardNotAuthorized],
    children: [
      {
        path: 'wishes',
        loadChildren: () => import('./modules/wishes/wishes.module').then(m => m.WishesModule)
      },
      {
        path: 'gifts',
        loadChildren: () => import('./modules/gifts/gifts.module').then(m => m.GiftsModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule)
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
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  // {
  //   pathMatch: 'full', path: '**', redirectTo: 'auth'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
