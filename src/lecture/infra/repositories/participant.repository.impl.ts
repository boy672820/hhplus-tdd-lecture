import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Participant } from '../../domain/models';
import { ParticipantRepository } from '../../domain/repositories';
import { ParticipantEntity } from '../entities/participant.entity';
import { ParticipantMapper } from '../mappers/participant.mapper';

@Injectable()
export class ParticipantRepositoryImpl implements ParticipantRepository {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async save(participant: Participant): Promise<void> {
    const repository = this.dataSource.manager.getRepository(ParticipantEntity);
    await repository.save(ParticipantMapper.toEntity(participant));
  }
}
