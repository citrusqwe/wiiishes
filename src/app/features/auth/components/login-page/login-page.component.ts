import {Component, inject} from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {Observable} from "rxjs";
import {AuthApiService} from "../../services/auth-api/auth-api.service";
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TuiSvgModule } from '@taiga-ui/core/components/svg';
import { TuiButtonModule } from '@taiga-ui/core/components/button';
import { TuiPrimitiveTextfieldModule, TuiErrorModule } from '@taiga-ui/core';
import { TuiInputModule, TuiFieldErrorPipeModule } from '@taiga-ui/kit';
import { TuiLoaderModule } from '@taiga-ui/core/components/loader';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.less'],
    standalone: true,
    imports: [
        TuiLoaderModule,
        FormsModule,
        ReactiveFormsModule,
        TuiInputModule,
        TuiPrimitiveTextfieldModule,
        TuiErrorModule,
        TuiButtonModule,
        TuiSvgModule,
        RouterLink,
        AsyncPipe,
        TuiFieldErrorPipeModule,
    ],
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
