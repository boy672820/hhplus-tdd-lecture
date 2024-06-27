import { LocalDate, LocalTime } from '@lib/types';
import { Lecture } from '../../domain/models';
import { LectureEntity } from '../entities/lecture.entity';

export class LectureMapper {
  static toDomain = (entity: LectureEntity): Lecture =>
    Lecture.from({
      id: entity.id,
      name: entity.name,
      date: LocalDate.parse(entity.date),
      time: LocalTime.parse(entity.time),
      maxParticipants: entity.maxParticipants,
      remainingSeats: entity.remainingSeats,
      createdDate: entity.createdDate,
      updatedDate: entity.updatedDate,
    });

  static toEntity = (domain: Lecture): LectureEntity => ({
    id: domain.id,
    name: domain.name,
    date: domain.date.toString(),
    time: domain.time.toString(),
    maxParticipants: domain.maxParticipants,
    remainingSeats: domain.remainingSeats,
    createdDate: domain.createdDate,
    updatedDate: domain.updatedDate,
  });
}
