import {IAppStore} from '../store.models';
import {createSelector} from '@ngrx/store';

export const getAuthenticationState = (state: IAppStore) => state.authenticationState;

/**
 * Returns the authenticated user
 */
export const getAuthenticatedUser = createSelector(getAuthenticationState, state => state.user);

/**
 * Returns the authentication error.
 */
export const getAuthenticationError = createSelector(getAuthenticationState, state => state.error);

/**
 * Returns true if the user is authenticated
 */
export const isAuthenticated = createSelector(getAuthenticationState, state => state.authenticated);



