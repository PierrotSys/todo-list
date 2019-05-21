export interface User {
  id: string;
  profile: string;
}

export interface AuthenticationState {
  // boolean if user is authenticated
  authenticated: boolean;

  // the authenticated user
  user?: User;
  
  error?: string;
}
