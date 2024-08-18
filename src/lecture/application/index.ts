import { Provider, Type } from '@nestjs/common';
import { LectureService } from './services';
import { LectureServiceImpl } from './services/lecture.service.impl';
import { UserAppliedHandler } from './events/user-applied.handler';

export const lectureServiceProvider: Provider = {
  provide: LectureService,
  useClass: LectureServiceImpl,
};

export const services: Provider[] = [lectureServiceProvider];
export const eventHandlers: Type<any>[] = [UserAppliedHandler];
