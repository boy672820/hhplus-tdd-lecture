import { Type } from '@nestjs/common';
import { LectureController } from './controllers/lecture.controller';

export const controllers: Type<any>[] = [LectureController];
