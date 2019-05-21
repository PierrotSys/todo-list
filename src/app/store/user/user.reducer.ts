import { User, AuthenticationState } from '../../models/user.model';
import * as UserActions from './user.action';

export type Action = UserActions.AllActions;

/**
 * Reducer that handle all TodoActions
 */
export function usersReducer(state, action: Action): AuthenticationState {
  switch (action.type) {
    case UserActions.AUTHENTICATE:
      return Object.assign({}, state, {
        loading: true
      });

    case UserActions.AUTHENTICATED_ERROR:
      return Object.assign({}, state, {
        authenticated: false,
        error: action.payload.error.message,
        loaded: true
      });

    case UserActions.AUTHENTICATED_SUCCESS:
      return Object.assign({}, state, {
        authenticated: action.payload.authenticated,
        user: action.payload.user
      });

    case UserActions.AUTHENTICATE_ERROR:
      return Object.assign({}, state, {
        authenticated: false,
        error: action.payload.error.message
      });

    case UserActions.AUTHENTICATE_SUCCESS:
      const user: User = action.payload.user;

      // verify user is not null
      if (user == null) {
        return state;
      }

      return Object.assign({}, state, {
        authenticated: true,
        error: undefined,
        user: user
      });

    default:
      return state;
  }
}