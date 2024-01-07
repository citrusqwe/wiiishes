import {ChangeDetectionStrategy, Component, inject, Input} from '@angular/core';
import {AuthService, UserData} from "../../../../shared/services/auth/auth.service";
import {Observable} from "rxjs";
import { RouterLink } from '@angular/router';
import { TuiButtonModule } from '@taiga-ui/core/components/button';
import { NgTemplateOutlet, AsyncPipe } from '@angular/common';
import { SkeletonDirective } from '../../../../shared/directives/skeleton/skeleton.directive';
import { TuiAvatarModule, TuiBadgeModule } from '@taiga-ui/kit';
import { TuiLetModule } from '@taiga-ui/cdk';

@Component({
    selector: 'app-wishes-header',
    templateUrl: './wishes-header.component.html',
    styleUrls: ['./wishes-header.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        TuiLetModule,
        TuiAvatarModule,
        SkeletonDirective,
        TuiBadgeModule,
        NgTemplateOutlet,
        TuiButtonModule,
        RouterLink,
        AsyncPipe,
    ],
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
