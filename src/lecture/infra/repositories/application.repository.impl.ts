import { Injectable } from '@nestjs/common';
import { ApplicationRepository } from '../../domain/repositories';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Application } from '../../domain/models';
import { ApplicationEntity } from '../entities/application.entity';
import { ApplicationMapper } from '../mappers/application.mapper';

@Injectable()
export class ApplicationRepositoryImpl implements ApplicationRepository {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async findByUserIdAndLectureId(
    userId: string,
    lectureId: string,
  ): Promise<Application | null> {
    const repository = await this.dataSource.getRepository(ApplicationEntity);
    const application = await repository.findOneBy({
      user: { id: userId },
      lecture: { id: lectureId },
    });
    return application ? ApplicationMapper.toDomain(application) : null;
  }

  async save(application: Application): Promise<void> {
    const repository = await this.dataSource.getRepository(ApplicationEntity);
    await repository.save(ApplicationMapper.toEntity(application));
  }
}
