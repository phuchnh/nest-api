export class LoggedInEvent {
  constructor(
    public readonly userId: string,
    public readonly loggedInAt: Date,
    public readonly refreshToken: string,
  ) {}
}
