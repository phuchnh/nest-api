import * as bcrypt from 'bcrypt';

export class Hash {
  static SALT_OR_ROUNDS = 10;

  static make(secret: string): string {
    return bcrypt.hashSync(secret, Hash.SALT_OR_ROUNDS);
  }

  static check(plainText: string, passwordHash: string): boolean {
    return bcrypt.compareSync(plainText, passwordHash);
  }
}
