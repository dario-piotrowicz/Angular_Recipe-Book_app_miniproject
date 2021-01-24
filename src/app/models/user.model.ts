export class User {
  constructor(
    public id: string,
    public email: string,
    private _authToken: string,
    private _authTokenExpirationDate: Date
  ) {}

  get authToken(): string {
    if (
      !this._authTokenExpirationDate ||
      new Date() > this._authTokenExpirationDate
    ) {
      this._authTokenExpirationDate = null;
      this._authToken = null;
    }
    return this._authToken;
  }
}
