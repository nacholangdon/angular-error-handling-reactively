import { Component, EventEmitter, Output } from '@angular/core';
import { catchError, ignoreElements, of } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.scss'],
})
export class ReactiveComponent {
  @Output() hasErrorEvent = new EventEmitter(false);

  // Reactive approach
  user2$ = this.userService.getUserWithError();
  user2Error$ = this.user2$.pipe(
    ignoreElements(),
    catchError((err) => {
      this.hasErrorEvent.emit(true);
      return of(err);
    })
  );

  constructor(private userService: UserService) {}
}
