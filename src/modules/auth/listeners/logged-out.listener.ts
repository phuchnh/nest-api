import { LoggedOutEvent } from '#modules/auth/events';
import { UserRepository } from '#modules/user/user.repository';
import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class LoggedOutListener {
  private readonly logger = new Logger(LoggedOutListener.name);

  constructor(private repository: UserRepository) {}

  @OnEvent(LoggedOutEvent.name, { async: true })
  async handleLoggedOut({ userId, loggedOutAt }: LoggedOutEvent) {
    await this.repository.update(userId, {
      lastLoggedInAt: loggedOutAt,
      rememberToken: null,
    });
    this.logger.log(`User ${userId} logged out at ${loggedOutAt}`);
  }
}
