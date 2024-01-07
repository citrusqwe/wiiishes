import {Component, inject} from '@angular/core';
import {ThemeService} from "../../shared/services/theme/theme.service";
import {Observable} from "rxjs";
import { TuiBrightness, TuiThemeNightModule, TuiRootModule, TuiModeModule } from "@taiga-ui/core";
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-core-layout',
    templateUrl: './core-layout.component.html',
    styleUrls: ['./core-layout.component.less'],
    standalone: true,
    imports: [NgIf, TuiThemeNightModule, TuiRootModule, TuiModeModule, AsyncPipe]
})
export class CoreLayoutComponent {
  private readonly themeService: ThemeService = inject(ThemeService);

  readonly theme$: Observable<TuiBrightness> | null = null;

  constructor() {
    this.theme$ = this.themeService.theme$;
  }
}
