import { LoggedFailEvent } from '#modules/auth/events';
import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class LoggedFailListener {
  private readonly logger = new Logger(LoggedFailListener.name);

  constructor() {}

  @OnEvent(LoggedFailEvent.name, { async: true })
  async handleLoggedFail({ email, loggedFailAt }: LoggedFailEvent) {
    this.logger.log(`The email ${email} logged fail at ${loggedFailAt}`);
  }
}
