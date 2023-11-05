import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {
  TUI_SANITIZER,
  TuiAlertModule,
  TuiButtonModule, TuiDataListModule,
  TuiDialogModule, TuiErrorModule, TuiHintModule, TuiHostedDropdownModule,
  TuiLinkModule, TuiLoaderModule, TuiModeModule,
  TuiRootModule,
  TuiSvgModule, TuiThemeNightModule
} from "@taiga-ui/core";
import {TuiSidebarModule} from "@taiga-ui/addon-mobile";
import {TuiActiveZoneModule, TuiForModule, TuiLetModule} from "@taiga-ui/cdk";
import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";
import {
  TuiAvatarModule,
  TuiBadgeModule, TuiDataListWrapperModule,
  TuiFieldErrorPipeModule, TuiFilesModule, TuiInputDateModule, TuiInputFilesModule,
  TuiInputModule, TuiMarkerIconModule,
  TuiSelectModule,
  TuiToggleModule
} from "@taiga-ui/kit";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ThemeToggleComponent} from './components/theme-toggle/theme-toggle.component';
import { UserPreviewComponent } from './components/user-preview/user-preview.component';
import {SkeletonDirective} from "../../directives/skeleton/skeleton.directive";
import {RouterLink} from "@angular/router";


@NgModule({
  declarations: [
    ThemeToggleComponent,
    UserPreviewComponent,
  ],
  imports: [
    //angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    //taiga
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiButtonModule,
    TuiSvgModule,
    TuiSidebarModule,
    TuiActiveZoneModule,
    TuiLinkModule,
    TuiToggleModule,
    TuiThemeNightModule,
    TuiModeModule,
    TuiAvatarModule,
    TuiBadgeModule,
    TuiInputModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiSelectModule,
    TuiDataListWrapperModule,
    TuiFilesModule,
    TuiMarkerIconModule,
    TuiInputFilesModule,
    TuiHostedDropdownModule,
    TuiDataListModule,
    TuiHintModule,
    TuiLoaderModule,
    TuiLetModule,
    TuiInputDateModule,
    TuiForModule,
    SkeletonDirective,
    RouterLink,
  ],
  exports: [
    //shared
    ThemeToggleComponent,
    //angular
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    //taiga
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiButtonModule,
    TuiSvgModule,
    TuiSidebarModule,
    TuiActiveZoneModule,
    TuiLinkModule,
    TuiToggleModule,
    TuiThemeNightModule,
    TuiModeModule,
    TuiAvatarModule,
    TuiBadgeModule,
    TuiInputModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiSelectModule,
    TuiDataListWrapperModule,
    TuiFilesModule,
    TuiMarkerIconModule,
    TuiInputFilesModule,
    TuiHostedDropdownModule,
    TuiDataListModule,
    TuiHintModule,
    TuiLoaderModule,
    TuiLetModule,
    TuiInputDateModule,
    TuiForModule,
    UserPreviewComponent,
  ],
  providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}],
})
export class SharedModule {
}
