import { Inject } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';

export const awsConfig = registerAs('aws', () => ({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  bucket: process.env.AWS_BUCKET,
  assetUrl: process.env.AWS_ASSET_URL,
}));

export type AwsConfig = ConfigType<typeof awsConfig>;

export const InjectAwsConfig = Inject(awsConfig.KEY);
