import * as UserActions from './user.action';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { mergeMap, switchMap, map } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  /**
   * Authenticate user.
   */
  @Effect()
  authenticate$: Observable<Action> = this.actions$.pipe(
    ofType<UserActions.AuthenticateAction>(UserActions.AUTHENTICATE),
    switchMap(action => {
      return this.userService
        .authenticate(action.payload)
        .pipe(
          map(
            user => new UserActions.AuthenticationSuccessAction({ user: user })
          )
        );
    })
  );

  /**
   * Determine if the user is authenticated.
   */
  @Effect()
  authenticated$: Observable<Action> = this.actions$.pipe(
    ofType<UserActions.AuthenticatedAction>(UserActions.AUTHENTICATED),
    switchMap(action => {
      return this.userService
        .authenticatedUser()
        .pipe(
          map(
            user =>
              new UserActions.AuthenticatedSuccessAction({
                authenticated: user !== null,
                user: user
              })
          )
        );
    })
  );
}
