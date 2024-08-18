import { Application } from '../../domain/models';
import { ApplicationEntity } from '../entities/application.entity';
import { LectureEntity } from '../entities/lecture.entity';
import { UserEntity } from '../entities/user.entity';

export class ApplicationMapper {
  static toDomain = (entity: ApplicationEntity): Application =>
    Application.from({
      id: entity.id,
      lectureId: entity.lecture.id,
      userId: entity.user.id,
      appliedDate: entity.appliedDate,
    });

  static toEntity(domain: Application): ApplicationEntity {
    const entity = new ApplicationEntity();
    entity.id = domain.id;
    entity.lecture = new LectureEntity();
    entity.lecture.id = domain.lectureId;
    entity.user = new UserEntity();
    entity.user.id = domain.userId;
    entity.appliedDate = domain.appliedDate;
    return entity;
  }
}
