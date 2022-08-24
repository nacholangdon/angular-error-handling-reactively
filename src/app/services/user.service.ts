import { Injectable } from '@angular/core';
import { concatMap, delay, Observable, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  getUser(): Observable<string> {
    return of('User 1').pipe(delay(2000));
  }

  getUserWithError(): Observable<string> {
    return of('User 1').pipe(
      delay(2000),
      tap((user) => {
        throw new Error('Error while fetching data: ' + user);
      })
    );
  }

  getTemporalUser() {
    return of('User 1', 'User 2', 'Error', 'User 3').pipe(
      concatMap((user) => of(user).pipe(delay(2000))),
      tap((user) => {
        if (user === 'Error') {
          throw new Error('Error while fetching data');
        }
      })
    );
  }
}
