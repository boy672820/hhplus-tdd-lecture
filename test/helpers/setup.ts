import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { UserEntity } from '../../src/lecture/infra/entities/user.entity';
import { LectureEntity } from '../../src/lecture/infra/entities/lecture.entity';
import { mockLecture, mockUsers } from './mocks';

dotenv.config({ path: '.env.test' });

const dataSource = new DataSource({
  type: process.env.DATABASE_TYPE as any,
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT) || 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  synchronize: true,
});

const setup = async () => {
  const connection = await dataSource.initialize();
  await connection.manager.save(UserEntity, mockUsers);
  await connection.manager.save(LectureEntity, mockLecture);
};

const teardown = async () => {
  await dataSource.manager.remove(UserEntity, mockUsers);
  await dataSource.manager.remove(LectureEntity, mockLecture);
  await dataSource.destroy();
};

beforeAll(async () => {
  await setup();
});

afterAll(async () => {
  await teardown();
});
