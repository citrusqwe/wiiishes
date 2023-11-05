import {
  CanActivateFn,
  Router,
} from '@angular/router';
import {AuthService} from "../../services/auth/auth.service";
import {inject} from "@angular/core";
import {map, Observable, tap} from "rxjs";


// TODO: Подумать как тут пофиксить дублирование кода

export const authGuardNotAuthorized: CanActivateFn = (): Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.authUser$.pipe(
    map((user) => !!user),
    tap((access) => {
      if (!access) router.navigateByUrl('/auth/login');
    }),
  );
}

export const authGuardAuthorized: CanActivateFn = (): Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.authUser$.pipe(
    map((user) => !user),
    tap((access) => {
      if (!access) {
        router.navigateByUrl('');
      }
    }),
  );
}