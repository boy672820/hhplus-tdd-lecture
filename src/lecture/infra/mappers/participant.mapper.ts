import { Participant } from '../../domain/models';
import { ParticipantEntity } from '../entities/participant.entity';

export class ParticipantMapper {
  static toDomain = (entity: ParticipantEntity): Participant =>
    Participant.from({
      id: entity.id,
      lectureId: entity.lectureId,
      realname: entity.realname,
      email: entity.email,
      phone: entity.phone,
      participantedDate: entity.participantedDate,
    });

  static toEntity = (domain: Participant): ParticipantEntity => ({
    id: domain.id,
    lectureId: domain.lectureId,
    realname: domain.realname,
    email: domain.email,
    phone: domain.phone,
    participantedDate: domain.participantedDate,
  });
}
