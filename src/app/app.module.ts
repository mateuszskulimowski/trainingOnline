import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { NavigationComponentModule } from './components/navigation/navigation.component-module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LoadUserContextService } from './resolvers/load-user-context.service';
import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';
import { LoadUserContextServiceModule } from './resolvers/load-user-context.service-module';
import { InMemoryUserContextStorageModule } from './storages/in-memory-user-context.storage-module';
import { HasAdminDirective } from './directives/has-admin/has-admin.directive';
export const contextLoaded$: BehaviorSubject<boolean> =
  new BehaviorSubject<boolean>(false);
const contextLoadedForInitialize$: Observable<boolean> =
  contextLoaded$.asObservable();
function initializeAppFactory(
  resolver: LoadUserContextService
): () => Observable<any> {
  return () => {
    return resolver.load().pipe(
      tap(() => {
        contextLoaded$.next(true);
      }),
      switchMap(() => of(true))
    );
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),

    provideFirestore(() => getFirestore()),

    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    NavigationComponentModule,
    DragDropModule,
    LoadUserContextServiceModule,
    InMemoryUserContextStorageModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [LoadUserContextService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
