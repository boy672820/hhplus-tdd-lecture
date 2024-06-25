import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/models';
import { UserMapper } from '../mappers/user.mapper';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async findById(id: string): Promise<User> {
    const repository = this.dataSource.manager.getRepository(UserEntity);
    const user = await repository.findOneBy({ id });
    return user ? UserMapper.toDomain(user) : null;
  }
}
