import { Injectable } from '@nestjs/common';
import { LectureRepository } from '../../domain/repositories';
import { Lecture } from '../../domain/models';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { LectureEntity } from '../entities/lecture.entity';
import { LectureMapper } from '../mappers/lecture.mapper';

@Injectable()
export class LectureRepositoryImpl implements LectureRepository {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async save(lecture: Lecture): Promise<void> {
    const repository = await this.dataSource.getRepository(LectureEntity);
    await repository.save(LectureMapper.toEntity(lecture));
  }

  async findById(id: string): Promise<Lecture> {
    const repository = await this.dataSource.getRepository(LectureEntity);
    const lecture = await repository.findOneBy({ id });
    return lecture ? LectureMapper.toDomain(lecture) : null;
  }
}
