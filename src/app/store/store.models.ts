import {Todo} from '../models/todo.model';
import { User, AuthenticationState } from '../models/user.model';

export interface IAppStore {
  toDoList: Array<Todo>;
  authenticationState: AuthenticationState;
}

/**
 * Initial state of store
 */
export const INITIAL_STATE: IAppStore = {
  toDoList: [],
  authenticationState: {authenticated: false, user: null}
};
