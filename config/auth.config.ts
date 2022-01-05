import { Inject } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';

export const authConfig = registerAs('auth', () => ({
  jwt: {
    algorithm: 'RS256',
    secret: process.env.JWT_SECRET || 'secret',
    signOptions: {
      expiresIn: Number(process.env.JWT_TTL) || 60 * 30,
    },
  },
}));

export type AuthConfig = ConfigType<typeof authConfig>;
export const InjectAuthConfig = Inject(authConfig.KEY);
