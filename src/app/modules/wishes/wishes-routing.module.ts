import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {WishesComponent} from "./components/wishes/wishes.component";
import {WishesPreviewComponent} from "./components/wishes-preview/wishes-preview.component";

const routes: Routes = [
  {
    path: '', component: WishesComponent,
  },
  {
    path: 'create', component: WishesPreviewComponent,
  },
  {
    path: 'edit/:id', component: WishesPreviewComponent,
  },
  {
    path: ':uid', component: WishesComponent,
  },
  {
    path: 'edit/:uid/:id', component: WishesPreviewComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class WishesRoutingModule {
}
