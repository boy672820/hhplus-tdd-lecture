import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Participant } from '../../domain/models';
import { CompositeKey, ParticipantRepository } from '../../domain/repositories';
import { ParticipantEntity } from '../entities/participant.entity';
import { ParticipantMapper } from '../mappers/participant.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ParticipantRepositoryImpl implements ParticipantRepository {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async findById({
    sessionId,
    userId,
  }: CompositeKey): Promise<Participant | null> {
    const repository = this.dataSource.manager.getRepository(ParticipantEntity);
    const participant = await repository.findOneBy({ sessionId, userId });
    return participant ? ParticipantMapper.toDomain(participant) : null;
  }

  async save(participant: Participant): Promise<void> {
    const repository = this.dataSource.manager.getRepository(ParticipantEntity);
    await repository.save(ParticipantMapper.toEntity(participant));
  }

  async exists({ sessionId, userId }: CompositeKey): Promise<boolean> {
    const repository = this.dataSource.manager.getRepository(ParticipantEntity);
    const exists = await repository.exists({
      where: { sessionId, userId },
    });
    return exists;
  }
}
