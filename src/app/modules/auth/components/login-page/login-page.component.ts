import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {AuthApiService} from "../../services/auth-api/auth-api.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.less'],
})
export class LoginPageComponent {
  // private readonly authService: AuthService = inject(AuthService);
  private readonly authSharedService: AuthApiService = inject(AuthApiService);

  loginForm: FormGroup = new FormGroup<any>({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  });

  // TODO: make async validator for email existance

  // TODO: check how to display loading with subject in service
  // isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  readonly isLoading$: Observable<boolean> = this.authSharedService.isLoading$;

  login(): void {
    const user = this.loginForm.getRawValue();
    this.authSharedService.login(user).subscribe();
  }

  loginWithGoogle(): void {
    this.authSharedService.loginWithGoogle().subscribe();
  }
}
