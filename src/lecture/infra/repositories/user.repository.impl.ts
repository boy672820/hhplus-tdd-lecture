import { connection } from '@lib/decorators';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/models';
import { UserMapper } from '../mappers/user.mapper';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  async findById(id: string): Promise<User> {
    const repository = connection.manager.getRepository(UserEntity);
    const user = await repository.findOneBy({ id });
    return user ? UserMapper.toDomain(user) : null;
  }

  async save(user: User): Promise<void> {
    const repository = connection.manager.getRepository(UserEntity);
    await repository.save(UserMapper.toEntity(user));
  }

  async remove(user: User): Promise<void> {
    const repository = connection.manager.getRepository(UserEntity);
    await repository.remove(UserMapper.toEntity(user));
  }
}
