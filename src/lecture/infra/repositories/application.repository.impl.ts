import { connection } from '@lib/decorators';
import { Injectable } from '@nestjs/common';
import { ApplicationRepository } from '../../domain/repositories';
import { Application } from '../../domain/models';
import { ApplicationEntity } from '../entities/application.entity';
import { ApplicationMapper } from '../mappers/application.mapper';

@Injectable()
export class ApplicationRepositoryImpl implements ApplicationRepository {
  async findByUserIdAndLectureId(
    userId: string,
    lectureId: string,
  ): Promise<Application | null> {
    const repository = connection.manager.getRepository(ApplicationEntity);
    const application = await repository.findOne({
      where: {
        user: { id: userId },
        lecture: { id: lectureId },
      },
      relations: ['user', 'lecture'],
    });
    return application ? ApplicationMapper.toDomain(application) : null;
  }

  async save(application: Application): Promise<void> {
    const repository = connection.manager.getRepository(ApplicationEntity);
    await repository.save(ApplicationMapper.toEntity(application));
  }
}
