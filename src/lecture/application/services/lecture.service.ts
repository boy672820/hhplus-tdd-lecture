import { Application } from '../../domain/models';

export abstract class LectureService {
  abstract apply(lectureId: string, userId: string): Promise<Application>;
}
