import { connection } from '@lib/decorators';
import { Injectable } from '@nestjs/common';
import { LectureRepository } from '../../domain/repositories';
import { Lecture } from '../../domain/models';
import { LectureEntity } from '../entities/lecture.entity';
import { LectureMapper } from '../mappers/lecture.mapper';

@Injectable()
export class LectureRepositoryImpl implements LectureRepository {
  async save(lecture: Lecture): Promise<void> {
    await connection.manager
      .getRepository(LectureEntity)
      .save(LectureMapper.toEntity(lecture));
  }

  async update(lecture: Lecture): Promise<void> {
    await connection.manager
      .getRepository(LectureEntity)
      .createQueryBuilder()
      .setLock('pessimistic_write')
      .update(LectureEntity)
      .set(LectureMapper.toEntity(lecture))
      .where('lecture_id = :id', { id: lecture.id })
      .execute();
  }

  async findById(id: string): Promise<Lecture> {
    const lecture = await connection.manager
      .getRepository(LectureEntity)
      .findOne({
        where: { id },
        lock: { mode: 'pessimistic_write' },
      });
    return lecture ? LectureMapper.toDomain(lecture) : null;
  }
}
