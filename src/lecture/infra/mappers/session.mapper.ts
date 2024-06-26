import { Session } from '../../domain/models';
import { SessionEntity } from '../entities/session.entity';
import { ApplicationMapper } from './application.mapper';
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
      applications: entity.applications.map(ApplicationMapper.toDomain),
      createdDate: entity.createdDate,
      updatedDate: entity.updatedDate,
    });

  static toEntity(domain: Session): SessionEntity {
    const entity = new SessionEntity();
    entity.id = domain.id;
    entity.date = domain.date;
    entity.time = domain.time;
    entity.isPublished = domain.isPublished;
    entity.maxParticipants = domain.maxParticipants;
    entity.createdDate = domain.createdDate;
    entity.updatedDate = domain.updatedDate;
    entity.lecture = LectureMapper.toEntity(domain.lecture);
    entity.applications = domain.applications.map(ApplicationMapper.toEntity);
    return entity;
  }
}
