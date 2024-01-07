import {Component} from '@angular/core';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CoreLayoutComponent } from '../core-layout/core-layout.component';

@Component({
    selector: 'app-auth-layout',
    templateUrl: './auth-layout.component.html',
    styleUrls: ['./auth-layout.component.less', '../core-layout/core-layout.component.less'],
    standalone: true,
    imports: [CoreLayoutComponent, RouterLink, ThemeToggleComponent, RouterOutlet]
})
export class AuthLayoutComponent {

}
