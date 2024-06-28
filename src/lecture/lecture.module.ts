import { Module } from '@nestjs/common';
import { controllers } from './presentation';
import { eventHandlers, services } from './application';
import { mappers, repositories } from './infra';
import { factories } from './domain';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  providers: [
    ...services,
    ...eventHandlers,
    ...repositories,
    ...mappers,
    ...factories,
  ],
  controllers,
})
export class LectureModule {}
