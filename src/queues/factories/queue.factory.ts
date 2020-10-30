import { ConfigService } from '@nestjs/config';

export const queueFactory = (name: string) => {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return async (configService: ConfigService) => ({
    name,
    redis: `redis://${configService.get('QUEUE_REDIS_HOST')}:${configService.get('QUEUE_REDIS_PORT')}`,
    prefix: 'prefix',
    defaultJobOptions: {
      removeOnComplete: true,
      removeOnFail: true,
    },
    settings: {
      lockDuration: 300000,
    }
  });
}
