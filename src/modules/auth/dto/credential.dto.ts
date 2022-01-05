import { IsNotEmpty, IsString } from 'class-validator';

export class CredentialDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
