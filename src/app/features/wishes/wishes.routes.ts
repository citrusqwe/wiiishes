import {Route} from "@angular/router";
import {WishesComponent} from "./components/wishes/wishes.component";
import {WishesPreviewComponent} from "./components/wishes-preview/wishes-preview.component";

export default [
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
] satisfies Route[];