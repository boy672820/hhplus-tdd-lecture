import { ulid } from 'ulid';
import { faker } from '@faker-js/faker';
import { UserEntity } from '../../src/lecture/infra/entities/user.entity';
import { LectureEntity } from '../../src/lecture/infra/entities/lecture.entity';

export const mockUsers: UserEntity[] = Array.from({ length: 50 }, () => {
  const user = new UserEntity();
  user.id = ulid();
  user.realname = faker.person.fullName();
  user.email = faker.internet.email();
  user.phone = faker.phone.number();
  user.createdDate = new Date();
  user.updatedDate = new Date();
  return user;
});

export const mockLecture: LectureEntity = new LectureEntity();
mockLecture.id = ulid();
mockLecture.name = faker.lorem.sentence();
mockLecture.date = '2024-06-27';
mockLecture.time = '10:00:00';
mockLecture.maxParticipants = 30;
mockLecture.remainingSeats = 30;
mockLecture.createdDate = new Date();
mockLecture.updatedDate = new Date();
