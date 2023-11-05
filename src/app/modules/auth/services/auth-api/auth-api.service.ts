import {inject, Injectable} from '@angular/core';
import {AuthService, UserData, UserFormData, UserLogin} from "../../../../services/auth/auth.service";
import {BehaviorSubject, catchError, map, Observable, switchMap, tap, throwError} from "rxjs";
import {TuiAlertService} from "@taiga-ui/core";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private readonly authService: AuthService = inject(AuthService);
  private readonly alertService: TuiAlertService = inject(TuiAlertService);
  private readonly router: Router = inject(Router);

  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoading$(): Observable<boolean> {
    return this.isLoading.asObservable();
  }

  constructor() {
  }

  successCreateOrLogin(isCreated: boolean): void {
    this.alertService.open(`${isCreated ? 'profile created' : 'success login'}🥳`, {status: "success"}).subscribe();
    this.router.navigateByUrl('/wishes');
  }

  loginWithGoogle(): Observable<UserData> {
    return this.authService.loginWithGoogle().pipe(
      tap(() => this.isLoading.next(true)),
      catchError(err => {
        this.isLoading.next(false);
        return throwError(() => err);
      }),
      tap(() => {
        this.isLoading.next(false);
        this.successCreateOrLogin(false);
      }),
    );
  }

  signup(user: UserFormData): Observable<UserData | null> {
    // TODO: add remove image from storage on fail

    this.isLoading.next(true);
    return this.authService.loadImage(user.image).pipe(
      map((image: string | null) => ({...user, image})),
      switchMap((data) =>
        this.authService.signup(data).pipe(
          catchError(err => {
            this.isLoading.next(false);
            return throwError(() => err);
          }),
        )
      ),
      catchError(err => {
        this.isLoading.next(false);
        return throwError(() => err);
      }),
      tap(() => {
        this.isLoading.next(false);
        this.successCreateOrLogin(true);
      }),
    );
  }

  login(user: UserLogin): Observable<UserData | null> {
    this.isLoading.next(true);
    return this.authService.login(user).pipe(
      catchError(err => {
        this.isLoading.next(false);
        return throwError(() => err);
      }),
      tap(() => {
        this.isLoading.next(false);
        this.successCreateOrLogin(false);
      }),
    );
  }
}
