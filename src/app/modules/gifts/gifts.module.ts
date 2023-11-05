import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiftsComponent } from './components/gifts/gifts.component';
import {GiftsRoutingModule} from "./gifts-routing.module";
import {SharedModule} from "../shared/shared.module";
import {WishesModule} from "../wishes/wishes.module";


@NgModule({
  declarations: [
    GiftsComponent,
  ],
  imports: [
    CommonModule,
    GiftsRoutingModule,
    SharedModule,
    WishesModule,
  ]
})
export class GiftsModule { }
