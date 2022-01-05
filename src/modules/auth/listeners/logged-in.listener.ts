import { LoggedInEvent } from '#modules/auth/events';
import { UserRepository } from '#modules/user/user.repository';
import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class LoggedInListener {
  private readonly logger = new Logger(LoggedInListener.name);

  constructor(private repository: UserRepository) {}

  @OnEvent(LoggedInEvent.name, { async: true })
  async handleLoggedIn({ userId, loggedInAt, refreshToken }: LoggedInEvent) {
    await this.repository.update(userId, {
      lastLoggedInAt: loggedInAt,
      rememberToken: refreshToken,
    });

    this.logger.log(`User ${userId} logged in at ${loggedInAt}`);
  }
}
