import { AwsConfig, awsConfig } from '#config';
import { S3 } from 'aws-sdk';
import { isEmpty } from 'class-validator';

export const S3_CLIENT = 'S3_CONNECTION';

export const S3ClientFactory = {
  provide: S3_CLIENT,
  useFactory: (awsConfig: AwsConfig) => {
    return new S3({
      accessKeyId: awsConfig.accessKeyId,
      secretAccessKey: awsConfig.secretAccessKey,
      region: awsConfig.region,
      ...(!isEmpty(awsConfig.assetUrl) && { endpoint: awsConfig.assetUrl }),
      ...(!isEmpty(awsConfig.assetUrl) && { s3ForcePathStyle: true }),
    });
  },
  inject: [awsConfig.KEY],
};
