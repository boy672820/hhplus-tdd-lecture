import { Transactional } from '@lib/decorators';
import { ApplicationError } from '@lib/errors';
import { Inject, Injectable } from '@nestjs/common';
import { LectureService } from './lecture.service';
import { Application, Lecture } from '../../domain/models';
import {
  APPLICATION_REPOSITORY,
  ApplicationRepository,
  LECTURE_REPOSITORY,
  LectureRepository,
  USER_REPOSITORY,
  UserRepository,
} from '../../domain/repositories';

@Injectable()
export class LectureServiceImpl extends LectureService {
  constructor(
    @Inject(LECTURE_REPOSITORY)
    private readonly lectureRepository: LectureRepository,
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject(APPLICATION_REPOSITORY)
    private readonly applicationRepository: ApplicationRepository,
  ) {
    super();
  }

  async findAll(): Promise<Lecture[]> {
    const lectures = await this.lectureRepository.findAll();
    return lectures;
  }

  @Transactional()
  async apply(lectureId: string, userId: string): Promise<Application> {
    const lecture = await this.lectureRepository.findById(lectureId);

    if (!lecture) {
      throw ApplicationError.notFound('특강을 찾을 수 없습니다.');
    }

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw ApplicationError.unauthorized('유저를 찾을 수 없습니다.');
    }

    const application =
      await this.applicationRepository.findByUserIdAndLectureId(
        userId,
        lectureId,
      );

    if (application) {
      throw ApplicationError.duplicated('이미 신청한 특강입니다.');
    }

    const newApplication = lecture.applyUser(user);

    await this.applicationRepository.save(newApplication);
    await this.lectureRepository.save(lecture);

    return newApplication;
  }

  async isApplied(lectureId: string, userId: string): Promise<boolean> {
    const application =
      await this.applicationRepository.findByUserIdAndLectureId(
        userId,
        lectureId,
      );

    return application !== null;
  }
}
