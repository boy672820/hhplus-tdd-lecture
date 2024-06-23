import { Module } from '@nestjs/common';
import { LectureModule } from './lecture/lecture.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [CoreModule, LectureModule],
})
export class AppModule {}
