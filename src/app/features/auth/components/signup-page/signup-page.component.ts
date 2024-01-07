import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {BehaviorSubject, Observable} from "rxjs";
import {UserForm, UserFormData} from "../../../../shared/services/auth/auth.service";
import {AuthApiService} from "../../services/auth-api/auth-api.service";
import { RouterLink } from '@angular/router';
import { TuiButtonModule } from '@taiga-ui/core/components/button';
import { TuiPrimitiveTextfieldModule, TuiErrorModule } from '@taiga-ui/core';
import { TuiSvgModule } from '@taiga-ui/core/components/svg';
import { NgIf, AsyncPipe } from '@angular/common';
import { TuiAvatarModule, TuiInputModule, TuiInputDateModule, TuiFieldErrorPipeModule } from '@taiga-ui/kit';
import { TuiLetModule } from '@taiga-ui/cdk';
import { TuiLoaderModule } from '@taiga-ui/core/components/loader';

@Component({
    selector: 'app-signup-page',
    templateUrl: './signup-page.component.html',
    styleUrls: ['./signup-page.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [TuiLoaderModule, TuiLetModule, TuiAvatarModule, NgIf, TuiSvgModule, FormsModule, ReactiveFormsModule, TuiInputModule, TuiPrimitiveTextfieldModule, TuiErrorModule, TuiInputDateModule, TuiButtonModule, RouterLink, AsyncPipe, TuiFieldErrorPipeModule]
})
export class SignupPageComponent {
  private readonly authSharedService: AuthApiService = inject(AuthApiService);

  signupForm: FormGroup = new FormGroup<any>({
    image: new FormControl(null),
    email: new FormControl(null, [Validators.required, Validators.email]),
    username: new FormControl(null, [Validators.required]),
    birthday: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  }, {validators: this.confirmPasswordValidator(), updateOn: 'blur'});

  readonly imagePreview$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  // readonly isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  readonly isLoading$: Observable<boolean> = this.authSharedService.isLoading$;

  selectImage(event: Event): void {
    // TODO: заново не ставится превью аватарки почему то
    const target = event.target as HTMLInputElement;
    const file = target.files?.item(0);
    if (!file) {
      this.imagePreview$.next(null);
      return;
    }
    this.signupForm.patchValue({
      image: file
    });
    this.imagePreview$.next(URL.createObjectURL(file));
  }

  clearImage(event: Event): void {
    event.preventDefault();
    this.imagePreview$.next(null);
  }

  signup(): void {
    const data: UserForm = this.signupForm.getRawValue();
    const user: UserFormData = {
      birthday: new Date(data.birthday.year, data.birthday.month, data.birthday.day),
      image: data.image,
      email: data.email,
      username: data.username,
      password: data.password,
    };

    this.authSharedService.signup(user).subscribe(data => console.log(data));
  }

  signupWithGoogle(): void {
    this.authSharedService.loginWithGoogle().subscribe();
  }

  confirmPasswordValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group?.get('password')?.value;
      const confirm = group?.get('confirmPassword')?.value;
      return password && confirm && password !== confirm ? {passwordsMatch: "passwords doesn't match"} : null;
    }
  }
}
