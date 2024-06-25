import { Provider } from '@nestjs/common';
import { LectureService } from './services/lecture.service';
import { LectureServiceImpl } from './services/lecture.service.impl';

export const lectureServiceProvider = {
  provide: LectureService,
  useClass: LectureServiceImpl,
};

export const services: Provider[] = [lectureServiceProvider];
