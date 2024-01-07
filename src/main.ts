import {importProvidersFrom} from '@angular/core';
import {AppComponent} from './app/app.component';
import {provideStorage, getStorage} from '@angular/fire/storage';
import {provideFirestore, getFirestore} from '@angular/fire/firestore';
import {provideAuth, getAuth} from '@angular/fire/auth';
import {environment} from './environments/environment';
import {provideFirebaseApp, initializeApp} from '@angular/fire/app';
import {provideAnimations} from '@angular/platform-browser/animations';
import {BrowserModule, bootstrapApplication} from '@angular/platform-browser';
import {provideRouter} from "@angular/router";
import {ROUTES} from "./app/app.routes";
import {TuiRootModule} from "@taiga-ui/core";


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore()),
      provideStorage(() => getStorage()),
      TuiRootModule,
    ),
    provideRouter(ROUTES),
    provideAnimations(),
  ]
})
.catch(err => console.error(err));
