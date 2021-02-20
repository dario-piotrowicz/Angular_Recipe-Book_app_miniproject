export class User {
  constructor(
    public id: string,
    public email: string,
    private _authToken: string,
    public authTokenExpirationDate: Date
  ) {}

  get authToken(): string {
    if (
      !this.authTokenExpirationDate ||
      new Date() > this.authTokenExpirationDate
    ) {
      this.authTokenExpirationDate = null;
      this._authToken = null;
    }
    return this._authToken;
  }
}
