import { Provider } from '@nestjs/common';
import { LectureService } from './services';
import { LectureServiceImpl } from './services/lecture.service.impl';

export const lectureServiceProvider: Provider = {
  provide: LectureService,
  useClass: LectureServiceImpl,
};

export const services: Provider[] = [lectureServiceProvider];
