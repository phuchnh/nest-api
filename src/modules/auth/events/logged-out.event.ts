export class LoggedOutEvent {
  constructor(
    public readonly userId: string,
    public readonly loggedOutAt: Date,
  ) {}
}
