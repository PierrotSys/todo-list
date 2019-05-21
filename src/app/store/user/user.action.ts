import { Action } from '@ngrx/store';
import { User } from '../../models/user.model';

export const AUTHENTICATE = '[user] AUTHENTICATE';
export const AUTHENTICATED = '[user] AUTHENTICATED';
export const AUTHENTICATED_SUCCESS = '[user] AUTHENTICATED_SUCCESS';
export const AUTHENTICATED_ERROR = '[user] AUTHENTICATED_ERROR';
export const AUTHENTICATE_ERROR = '[user] AUTHENTICATE_ERROR';
export const AUTHENTICATE_SUCCESS = '[user] AUTHENTICATE_SUCCESS';

/**
 * Authenticate.
 */
export class AuthenticateAction implements Action {
  readonly type = AUTHENTICATE;

  constructor(public payload: string) {}
}

/**
 * Checks if user is authenticated.
 */
export class AuthenticatedAction implements Action {
  readonly type = AUTHENTICATED;

  constructor() {}
}

/**
 * Authenticated check success.
 */
export class AuthenticatedSuccessAction implements Action {
  readonly type = AUTHENTICATED_SUCCESS;

  constructor(public payload: { authenticated: boolean; user: User }) {}
}

/**
 * Authenticated check error.
 */
export class AuthenticatedErrorAction implements Action {
  readonly type = AUTHENTICATED_ERROR;

  constructor(public payload?: any) {}
}

/**
 * Authentication error.
 */
export class AuthenticationErrorAction implements Action {
  readonly type = AUTHENTICATE_ERROR;

  constructor(public payload?: any) {}
}

/**
 * Authentication success.
 */
export class AuthenticationSuccessAction implements Action {
  readonly type = AUTHENTICATE_SUCCESS;

  constructor(public payload: { user: User }) {}
}

/**
 * declare all actions.
 */
export type AllActions =
  | AuthenticateAction
  | AuthenticatedAction
  | AuthenticatedErrorAction
  | AuthenticatedSuccessAction
  | AuthenticationErrorAction
  | AuthenticationSuccessAction;
