import { Lecture } from '../../domain/models';
import { LectureEntity } from '../entities/lecture.entity';

export class LectureMapper {
  static toDomain = (entity: LectureEntity): Lecture =>
    Lecture.from({
      id: entity.id,
      name: entity.name,
      createdDate: entity.createdDate,
      updatedDate: entity.updatedDate,
    });

  static toEntity = (domain: Lecture): LectureEntity => ({
    id: domain.id,
    name: domain.name,
    createdDate: domain.createdDate,
    updatedDate: domain.updatedDate,
  });
}
