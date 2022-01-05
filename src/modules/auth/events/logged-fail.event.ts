export class LoggedFailEvent {
  constructor(
    public readonly email: string,
    public readonly loggedFailAt: Date,
  ) {}
}
