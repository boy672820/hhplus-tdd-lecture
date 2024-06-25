import { Participant } from '../../domain/models';

export abstract class LectureService {
  abstract apply(lectureId: string, userId: string): Promise<Participant>;
}
