import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { of } from 'rxjs';
import "rxjs/add/observable/throw";
import { User } from "../models/user.model"
import { UserProfileEnum } from '../enum/user-profile.enum';

export const CURRENT_USER: User = {id: 'currentUser', profile: UserProfileEnum.current};
export const OTHER_USER: User = {id: 'otherUser', profile: UserProfileEnum.other};

/**
 * The user service.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  /**
   * True if authenticated
   * @type
   */
  private _authenticated = false;

  /**
   * Authenticate the user
   */
  public authenticate(id: string): Observable<User> {
    let authenticated: User = null;
    switch (id) {
      case CURRENT_USER.id:
      this._authenticated = true;
      authenticated = CURRENT_USER;
      break;
      case OTHER_USER.id:
      this._authenticated = true;
      authenticated = OTHER_USER;
      break;
    }
    if (authenticated !== null) {
      return of(authenticated);
    }
    return Observable.throw(new Error("Invalid id"));
  }

  /**
   * Determines if the user is authenticated
   */
  public authenticated(): Observable<boolean> {
    return of(this._authenticated);
  }

  /**
   * Returns the authenticated user
   */
  public authenticatedUser(): Observable<User> {
    return of(CURRENT_USER);
  }

}
