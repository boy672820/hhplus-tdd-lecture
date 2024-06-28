import { Lecture } from '../models';

export const LECTURE_REPOSITORY = Symbol.for('LECTURE_REPOSITORY');

export interface LectureRepository {
  findById(id: string): Promise<Lecture>;
  findAll(): Promise<Lecture[]>;
  save(lecture: Lecture): Promise<void>;
}
