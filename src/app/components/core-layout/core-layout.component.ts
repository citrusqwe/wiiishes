import {Component, inject} from '@angular/core';
import {ThemeService} from "../../services/theme/theme.service";
import {Observable} from "rxjs";
import {TuiBrightness} from "@taiga-ui/core";

@Component({
  selector: 'app-core-layout',
  templateUrl: './core-layout.component.html',
  styleUrls: ['./core-layout.component.less']
})
export class CoreLayoutComponent {
  private readonly themeService: ThemeService = inject(ThemeService);

  readonly theme$: Observable<TuiBrightness> | null = null;

  constructor() {
    this.theme$ = this.themeService.theme$;
  }
}
