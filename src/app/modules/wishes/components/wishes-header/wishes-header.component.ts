import {ChangeDetectionStrategy, Component, inject, Input} from '@angular/core';
import {AuthService, UserData} from "../../../../services/auth/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-wishes-header',
  templateUrl: './wishes-header.component.html',
  styleUrls: ['./wishes-header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WishesHeaderComponent {
  private readonly authService: AuthService = inject(AuthService);

  @Input() set uid(uid: string | null) {
    this.isMe = !uid;
    this.user$ = uid ? this.authService.getUser(uid) : this.authService.user$;
  }

  isMe: boolean = true;
  user$: Observable<UserData | null> | null = null;
}
