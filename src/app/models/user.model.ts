export class User {
  constructor(
    public id: string,
    public email: string,
    private _authToken: string,
    private _authTokenExpirationData: Date
  ) {}

  get authToken(): string {
    if (
      !this._authTokenExpirationData ||
      new Date() > this._authTokenExpirationData
    ) {
      this._authTokenExpirationData = null;
      this._authToken = null;
    }
    return this._authToken;
  }
}
