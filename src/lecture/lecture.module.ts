import { Module } from '@nestjs/common';
import { controllers } from './presentation';
import { services } from './application';
import { repositories } from './infra';

@Module({
  controllers,
  providers: [...repositories, ...services],
})
export class LectureModule {}
