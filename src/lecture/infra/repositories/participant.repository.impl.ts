import { connection } from '@lib/decorators';
import { Injectable } from '@nestjs/common';
import { Participant } from '../../domain/models';
import { ParticipantRepository } from '../../domain/repositories';
import { ParticipantEntity } from '../entities/participant.entity';
import { ParticipantMapper } from '../mappers/participant.mapper';

@Injectable()
export class ParticipantRepositoryImpl implements ParticipantRepository {
  async save(participant: Participant): Promise<void> {
    const repository = connection.manager.getRepository(ParticipantEntity);
    await repository.save(ParticipantMapper.toEntity(participant));
  }
}
