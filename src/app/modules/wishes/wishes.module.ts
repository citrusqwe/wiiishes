import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WishesComponent} from './components/wishes/wishes.component';
import {WishesRoutingModule} from "./wishes-routing.module";
import {SharedModule} from "../shared/shared.module";
import { WishesItemComponent } from './components/wishes-item/wishes-item.component';
import { WishesHeaderComponent } from './components/wishes-header/wishes-header.component';
import { WishesPreviewComponent } from './components/wishes-preview/wishes-preview.component';
import {SkeletonDirective} from "../../directives/skeleton/skeleton.directive";

@NgModule({
  declarations: [
    WishesComponent,
    WishesItemComponent,
    WishesHeaderComponent,
    WishesPreviewComponent
  ],
  exports: [
    WishesItemComponent
  ],
  imports: [
    CommonModule,
    WishesRoutingModule,
    SharedModule,
    SkeletonDirective
  ]
})
export class WishesModule {
}
