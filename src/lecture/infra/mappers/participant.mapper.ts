import { Participant } from '../../domain/models';
import { ParticipantEntity } from '../entities/participant.entity';

export class ParticipantMapper {
  static toDomain = (entity: ParticipantEntity): Participant =>
    Participant.from({
      sessionId: entity.sessionId,
      userId: entity.userId,
      realname: entity.user.realname,
      email: entity.user.email,
      phone: entity.user.phone,
      participantedDate: entity.participantedDate,
      createdDate: entity.user.createdDate,
      updatedDate: entity.user.updatedDate,
    });

  static toEntity = (domain: Participant): ParticipantEntity => ({
    sessionId: domain.sessionId,
    userId: domain.userId,
    participantedDate: domain.participantedDate,
    user: {
      id: domain.userId,
      realname: domain.realname,
      email: domain.email,
      phone: domain.phone,
      createdDate: domain.createdDate,
      updatedDate: domain.updatedDate,
    },
  });
}
