import { connection } from '@lib/decorators';
import { Injectable } from '@nestjs/common';
import { LectureRepository } from '../../domain/repositories';
import { Lecture } from '../../domain/models';
import { LectureEntity } from '../entities/lecture.entity';
import { LectureMapper } from '../mappers/lecture.mapper';

@Injectable()
export class LectureRepositoryImpl implements LectureRepository {
  constructor(private readonly mapper: LectureMapper) {}

  async save(lecture: Lecture): Promise<void> {
    await connection.manager
      .getRepository(LectureEntity)
      .save(this.mapper.toEntity(lecture));
  }

  async findAll(): Promise<Lecture[]> {
    const lectures = await connection.manager
      .getRepository(LectureEntity)
      .find();
    return lectures.map(this.mapper.toDomain);
  }

  async findById(id: string): Promise<Lecture> {
    const lecture = await connection.manager
      .getRepository(LectureEntity)
      .findOne({
        where: { id },
        lock: { mode: 'pessimistic_write' },
      });
    return lecture ? this.mapper.toDomain(lecture) : null;
  }
}
