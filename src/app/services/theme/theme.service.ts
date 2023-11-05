import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {TuiBrightness} from "@taiga-ui/core";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly theme = new BehaviorSubject<TuiBrightness>('onDark');
  readonly localStorageThemeId: string = `${environment.projectName}-dark-theme`;

  get theme$(): Observable<TuiBrightness> {
    return this.theme.asObservable();
  }

  get themeValue(): TuiBrightness {
    return this.theme.value;
  }

  constructor() {
    this.init();
  }

  init() {
    const theme = JSON.parse(window.localStorage.getItem(this.localStorageThemeId) as TuiBrightness);

    if (theme) {
      this.setTheme(theme);
    } else {
      window.localStorage.setItem(this.localStorageThemeId, JSON.stringify(this.theme.value));
    }
  }

  setTheme(theme: TuiBrightness): void {
    this.theme.next(theme);
  }
}
