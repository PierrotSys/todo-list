import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Store } from '@ngrx/store';
import { IAppStore } from '../store/store.models';
import { UserProfileEnum } from '../enum/user-profile.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationManagerService {
  private user: User;

  constructor(private store: Store<IAppStore>) {
    this.store
      .select(state => state.authenticationState)
      .subscribe(a => {
        this.user = a.user;
      });
  }

  public hasRight(requestedRight: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (isNullOrUndefined(requestedRight)) {
          reject(new Error('Unknown function!'));
          return;
        }
        if (
          !isNullOrUndefined(this.user) &&
          this.user.profile !== UserProfileEnum.current
        ) {
          resolve(true);
        } else {
          resolve(false);
        }
      }, 10);
    });
  }
}
