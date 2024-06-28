import { User } from '../../domain/models';
import { UserEntity } from '../entities/user.entity';

export class UserMapper {
  static toDomain = (entity: UserEntity): User =>
    User.from({
      id: entity.id,
      realname: entity.realname,
      email: entity.email,
      phone: entity.phone,
      createdDate: entity.createdDate,
      updatedDate: entity.updatedDate,
    });

  static toEntity = (domain: User): UserEntity => ({
    id: domain.id,
    realname: domain.realname,
    email: domain.email,
    phone: domain.phone,
    createdDate: domain.createdDate,
    updatedDate: domain.updatedDate,
  });
}
