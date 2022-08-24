import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { catchError, Observable, of, Subject, takeUntil } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-imperative-error',
  templateUrl: './imperative-error.component.html',
  styleUrls: ['./imperative-error.component.scss'],
})
export class ImperativeErrorComponent implements OnInit {
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
      .getUserWithError()
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
