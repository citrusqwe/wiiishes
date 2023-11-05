import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LayoutComponent} from './components/layout/layout.component';
import {SharedModule} from "./modules/shared/shared.module";
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { CoreLayoutComponent } from './components/core-layout/core-layout.component';
import {SkeletonDirective} from "./directives/skeleton/skeleton.directive";

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    AuthLayoutComponent,
    CoreLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    SkeletonDirective,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
