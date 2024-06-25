import { Session } from '../../domain/models';
import { SessionEntity } from '../entities/session.entity';
import { LectureMapper } from './lecture.mapper';

export class SessionMapper {
  static toDomain = (entity: SessionEntity): Session =>
    Session.from({
      id: entity.id,
      date: entity.date,
      time: entity.time,
      isPublished: entity.isPublished,
      maxParticipants: entity.maxParticipants,
      lecture: LectureMapper.toDomain(entity.lecture),
      createdDate: entity.createdDate,
      updatedDate: entity.updatedDate,
    });

  static toEntity = (domain: Session): SessionEntity => ({
    id: domain.id,
    date: domain.date,
    time: domain.time,
    isPublished: domain.isPublished,
    maxParticipants: domain.maxParticipants,
    lecture: LectureMapper.toEntity(domain.lecture),
    createdDate: domain.createdDate,
    updatedDate: domain.updatedDate,
  });
}
