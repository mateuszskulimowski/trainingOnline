// import { enableProdMode, importProvidersFrom } from '@angular/core';
// import { bootstrapApplication } from '@angular/platform-browser';
// import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
// import { provideFirestore, getFirestore } from '@angular/fire/firestore';
// import { provideAuth, getAuth } from '@angular/fire/auth';
// import { provideDatabase, getDatabase } from '@angular/fire/database';
// import { AppComponent } from './app/app.component';
// import { environment } from './environments/environment';
// import { NavigationComponentModule } from './app/components/navigation/navigation.component-module';
// import { NavigationComponent } from './app/components/navigation/navigation.component';
// import { RouterModule } from '@angular/router';
// import { routes } from './app/routes';
// import { AngularFireModule } from '@angular/fire/compat';
// import { StoreModule } from '@ngrx/store';

// if (environment.production) {
//   enableProdMode();
// }

// bootstrapApplication(AppComponent, {
//   providers: [
//     // Firebase App
//     provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),

//     // Firestore
//     provideFirestore(() => getFirestore()),

//     // Firebase Authentication
//     provideAuth(() => getAuth()),

//     // Realtime Database
//     provideDatabase(() => getDatabase()),
//     importProvidersFrom(NavigationComponentModule), // Dodanie NavigationComponentModule
//     importProvidersFrom(RouterModule.forRoot(routes)),
//     importProvidersFrom(AngularFireModule.initializeApp(environment.firebase)),
//     importProvidersFrom(StoreModule.forRoot({}, {})),
//   ],
// }).catch((err) => console.error(err));
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { NavigationComponentModule } from './app/components/navigation/navigation.component-module';
import { RouterModule } from '@angular/router';
import { routes } from './app/routes';
import { StoreModule } from '@ngrx/store';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    // Firebase Modular API
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    importProvidersFrom(
      AngularFireModule.initializeApp(environment.firebase),
      // AngularFireAuthModule,
      AngularFirestoreModule,
      AngularFireDatabaseModule,
      NavigationComponentModule,
      RouterModule.forRoot(routes),
      StoreModule.forRoot({}, {}),
    ),
  ],
}).catch((err) => console.error(err));
