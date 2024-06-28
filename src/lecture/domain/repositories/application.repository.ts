import { Application } from '../models';

export const APPLICATION_REPOSITORY = Symbol.for('APPLICATION_REPOSITORY');

export interface ApplicationRepository {
  findByUserIdAndLectureId(
    userId: string,
    lectureId: string,
  ): Promise<Application>;
  save(application: Application): Promise<void>;
}
