import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, Component } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import {
  BehaviorSubject,
  Observable,
  map,
  of,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { NavigationComponentModule } from './components/navigation/navigation.component-module';
import { LoadUserContextServiceModule } from './resolvers/load-user-context.service-module';
import { InMemoryUserContextStorageModule } from './storages/in-memory-user-context.storage-module';
import { CommentExerciseModalComponentModule } from './components/comment-exercise-modal/comment-exercise-modal.component-module';
import { StoreModule } from '@ngrx/store';
import { LoadUserContextService } from './resolvers/load-user-context.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
export const contextLoaded$: BehaviorSubject<boolean> =
  new BehaviorSubject<boolean>(false);
const contextLoadedForInitialize$: Observable<boolean> =
  contextLoaded$.asObservable();
function initializeAppFactory(
  resolver: LoadUserContextService,
): () => Observable<any> {
  return () => {
    return resolver.load().pipe(
      tap(() => {
        contextLoaded$.next(true);
      }),
      switchMap(() => of(true)),
    );
  };
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    // AppRoutingModule,
    // BrowserAnimationsModule,
    HttpClientModule,
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideAuth(() => getAuth()),
    // provideDatabase(() => getDatabase()),
    // importProvidersFrom(provideFirestore(() => getFirestore())),
    // provideFirestore(() => getFirestore()),
    RouterModule,
    ReactiveFormsModule,
    NavigationComponentModule,
    DragDropModule,
    LoadUserContextServiceModule,
    InMemoryUserContextStorageModule,
    CommentExerciseModalComponentModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [LoadUserContextService],
      multi: true,
    },
  ],
})
export class AppComponent {
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue),
    );
  }
}
