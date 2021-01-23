export interface AuthSignUpResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

export interface AuthSignInResponse extends AuthSignUpResponse {
  registered: boolean;
}
