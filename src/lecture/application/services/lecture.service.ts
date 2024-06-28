import { Application, Lecture } from '../../domain/models';

export abstract class LectureService {
  abstract findAll(): Promise<Lecture[]>;
  abstract apply(lectureId: string, userId: string): Promise<Application>;
  abstract isApplied(lectureId: string, userId: string): Promise<boolean>;
}
