import { Component, EventEmitter, Output } from '@angular/core';
import { catchError, ignoreElements, of } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-reactive-improved',
  templateUrl: './reactive-improved.component.html',
  styleUrls: ['./reactive-improved.component.scss'],
})
export class ReactiveImprovedComponent {
  @Output() hasErrorEvent = new EventEmitter(false);

  // Reactive approach v2
  user3$ = this.userService.getTemporalUser();
  user3Error$ = this.user3$.pipe(
    ignoreElements(),
    catchError((err) => {
      this.hasErrorEvent.emit(true);
      return of(err);
    })
  );

  constructor(private userService: UserService) {}

  ngOnInit(): void {}
}
