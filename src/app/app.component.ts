import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng-material-starter-kit-acms';
  // elementsSubject = new BehaviorSubject<string[]>([
  //   'Element 1',
  //   'Element 2',
  //   'Element 3',
  // ]);

  // onDrop(event: CdkDragDrop<string[]>): void {
  //   const elementsArray = this.elementsSubject.value;
  //   const movedElement = elementsArray[event.previousIndex];
  //   elementsArray.splice(event.previousIndex, 1);
  //   elementsArray.splice(event.currentIndex, 0, movedElement);
  //   this.elementsSubject.next([...elementsArray]);
  // }

  // pokaGo() {
  //   console.log(this.elementsSubject.value);
  // }
}
