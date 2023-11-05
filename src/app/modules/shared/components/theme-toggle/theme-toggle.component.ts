import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {tuiToggleOptionsProvider} from "@taiga-ui/kit";
import {FormControl} from "@angular/forms";
import {ThemeService} from "../../../../services/theme/theme.service";
import {TuiBrightness} from "@taiga-ui/core";

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    tuiToggleOptionsProvider({
      icons: {
        toggleOn: ({$implicit}) =>
          $implicit === 'l'
            ? 'tuiIconMoon'
            : 'tuiIconMoonLarge',
        toggleOff: ({$implicit}) =>
          $implicit === 'l' ? 'tuiIconSun' : 'tuiIconSunLarge',
      },
      showIcons: true,
    }),
  ],
})
export class ThemeToggleComponent implements OnInit {
  private readonly themeService: ThemeService = inject(ThemeService);

  private localStorageThemeId: string = '';
  themeSwitch: FormControl = new FormControl<boolean>(false);

  themeChanged(): void {
    this.themeService.setTheme(this.getThemeByState(this.themeSwitch.value));
    window.localStorage.setItem(this.localStorageThemeId,
      JSON.stringify(this.getThemeByState(this.themeSwitch.value)));
  }

  getThemeByState(state: boolean): TuiBrightness {
    return state ? 'onDark' : 'onLight';
  }

  getStateByTheme(theme: TuiBrightness): boolean {
    switch (theme) {
      case "onDark":
        return true;
      case "onLight":
        return false;
    }
  }

  ngOnInit(): void {
    this.localStorageThemeId = this.themeService.localStorageThemeId;
    this.themeSwitch.setValue(this.getStateByTheme(this.themeService.themeValue));
  }
}
