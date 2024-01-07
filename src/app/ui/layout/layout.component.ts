import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {AuthService} from "../../shared/services/auth/auth.service";
import {tap} from "rxjs";
import { Router, RouterLinkActive, RouterLink, RouterOutlet } from "@angular/router";
import { TuiSvgModule } from '@taiga-ui/core/components/svg';
import { TuiAvatarModule } from '@taiga-ui/kit';
import { SkeletonDirective } from '../../shared/directives/skeleton/skeleton.directive';
import { TuiDropdownModule } from '@taiga-ui/core/directives/dropdown';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';
import { TuiLinkModule, TuiHostedDropdownModule, TuiDataListModule } from '@taiga-ui/core';
import { NgFor, AsyncPipe } from '@angular/common';
import { CoreLayoutComponent } from '../core-layout/core-layout.component';
import { TuiLetModule } from '@taiga-ui/cdk';

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
    standalone: true,
    imports: [
        TuiLetModule,
        CoreLayoutComponent,
        NgFor,
        TuiLinkModule,
        RouterLinkActive,
        RouterLink,
        ThemeToggleComponent,
        TuiHostedDropdownModule,
        TuiDropdownModule,
        SkeletonDirective,
        TuiAvatarModule,
        TuiSvgModule,
        RouterOutlet,
        TuiDataListModule,
        AsyncPipe,
    ],
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
