import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {tap} from "rxjs";
import {Router} from "@angular/router";

interface LinkItem {
  text: string;
  icon: string;
  path: string;
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less', '../core-layout/core-layout.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);

  user$ = this.authService.user$;

  userMenuOpen: boolean = false;

  readonly sidebarLinks: LinkItem[] = [
    {
      text: 'wishes',
      icon: 'tuiIconHeartLarge',
      path: '/wishes'
    },
    {
      text: 'gifts',
      icon: 'tuiIconGiftLarge',
      path: '/gifts'
    },
    {
      text: 'users',
      icon: 'tuiIconUserLarge',
      path: '/users'
    },
  ];

  logout(): void {
    this.userMenuOpen = false;
    this.authService.logout().pipe(
      tap(() => this.router.navigateByUrl('/auth/login')),
    ).subscribe();
  }
}
