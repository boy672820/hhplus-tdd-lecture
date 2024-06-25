import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { SessionRepository } from '../../domain/repositories';
import { SessionEntity } from '../entities/session.entity';
import { SessionMapper } from '../mappers/session.mapper';
import { Session } from '../../domain/models';

@Injectable()
export class SessionRepositoryImpl implements SessionRepository {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async findById(id: string): Promise<Session> {
    const repository = this.dataSource.manager.getRepository(SessionEntity);
    const session = await repository.findOneBy({ id });
    return session ? SessionMapper.toDomain(session) : null;
  }
}
