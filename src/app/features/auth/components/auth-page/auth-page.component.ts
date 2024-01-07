import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-auth-page',
    templateUrl: './auth-page.component.html',
    styleUrls: ['./auth-page.component.less'],
    standalone: true,
    imports: [RouterOutlet]
})
export class AuthPageComponent {

}
