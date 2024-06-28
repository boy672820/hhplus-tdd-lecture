import { Lecture } from '../models';

export const LECTURE_REPOSITORY = Symbol.for('LECTURE_REPOSITORY');

export interface LectureRepository {
  findById(id: string): Promise<Lecture>;
  save(lecture: Lecture): Promise<void>;
  update(lecture: Lecture): Promise<void>;
}
