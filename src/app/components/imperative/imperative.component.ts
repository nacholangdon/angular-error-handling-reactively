import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { catchError, Observable, of, Subject, takeUntil } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-imperative',
  templateUrl: './imperative.component.html',
  styleUrls: ['./imperative.component.scss'],
})
export class ImperativeComponent implements OnInit, OnDestroy {
  @Output() hasErrorEvent = new EventEmitter(false);

  // Imperative approach
  user: string | undefined;
  isLoading = true;
  hasError = false;
  error: string | undefined;

  // Trigger this to unsubscribe observables
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Imperative approach
    this.userService
      .getUser()
      //.getUserWithError()
      .pipe(
        takeUntil(this.destroy$),
        catchError((err: any, caught: Observable<string>) => {
          this.hasErrorEvent.emit(true);
          this.hasError = !!err;
          this.error = err.message;
          return of(null);
        })
      )
      .subscribe((response) => {
        this.isLoading = false;
        this.user = response ?? undefined;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
