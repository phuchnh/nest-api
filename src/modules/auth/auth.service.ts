import { Hash } from '#common/utils/Hash';
import { Role } from '#modules/user/types';
import { User } from '#modules/user/entities';
import { UserRepository } from '#modules/user/user.repository';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';
import moment from 'moment/moment';
import { CredentialDto } from './dto/credential.dto';
import { LoggedFailEvent, LoggedInEvent, LoggedOutEvent } from './events';
import {
  InvalidCredentialException,
  InvalidTokenException,
  InvalidUserException,
  TokenRevokedException,
} from './exceptions';

@Injectable()
export class AuthService {
  constructor(
    private emitter: EventEmitter2,
    private repository: UserRepository,
    private jwtService: JwtService,
  ) {}

  createRefreshToken(user: User): string {
    const options: JwtSignOptions = { expiresIn: '180d' };
    return this.jwtService.sign({ sub: user.id }, options);
  }

  createAccessToken(user: User): string {
    const options: JwtSignOptions = { expiresIn: '90d' };
    return this.jwtService.sign({ sub: user.id }, options);
  }

  async login(credential: CredentialDto, role: Role = Role.User) {
    const { email, password } = credential;
    const user = await this.repository.findOne({ email, role });
    if (!user || !Hash.check(password, user.password)) {
      this.emitter.emit(
        LoggedFailEvent.name,
        new LoggedFailEvent(email, new Date()),
      );
      throw new InvalidCredentialException();
    }
    const accessToken = this.createAccessToken(user);
    const refreshToken = this.createRefreshToken(user);
    this.emitter.emit(
      LoggedInEvent.name,
      new LoggedInEvent(user.id, new Date(), refreshToken),
    );
    return { accessToken, refreshToken };
  }

  async validateRefreshToken(token: string): Promise<string> {
    const payload = this.jwtService.decode(token) as JwtPayload;
    const { sub } = payload;
    const user = await this.repository.findOne({ id: sub });
    if (!user) {
      throw new InvalidTokenException();
    }
    return this.createAccessToken(user);
  }

  async validateAccessToken(payload: JwtPayload): Promise<User> {
    const { sub, iat } = payload;
    const user = await this.repository.findOne({ id: sub });
    if (!user) {
      throw new InvalidUserException();
    }
    const lastLoggedInAt = moment(user.lastLoggedInAt);
    const issuedAt = moment(iat * 1000);
    if (lastLoggedInAt.isAfter(issuedAt, 'seconds')) {
      throw new TokenRevokedException();
    }
    return user;
  }

  logout(user: User) {
    this.emitter.emit(
      LoggedOutEvent.name,
      new LoggedOutEvent(user.id, new Date()),
    );
  }
}
