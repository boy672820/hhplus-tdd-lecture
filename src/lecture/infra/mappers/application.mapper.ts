import { Application } from '../../domain/models';
import { ApplicationEntity } from '../entities/application.entity';

export class ApplicationMapper {
  static toDomain = (entity: ApplicationEntity): Application =>
    Application.from({
      id: entity.id,
      sessionId: entity.session.id,
      userId: entity.participant.user.id,
      realname: entity.participant.user.realname,
      email: entity.participant.user.email,
      phone: entity.participant.user.phone,
      appliedDate: entity.appliedDate,
      createdDate: entity.participant.user.createdDate,
      updatedDate: entity.participant.user.updatedDate,
    });

  static toEntity(domain: Application): ApplicationEntity {
    const entity = new ApplicationEntity();
    entity.id = domain.id;
    entity.appliedDate = domain.appliedDate;
    return entity;
  }
}
