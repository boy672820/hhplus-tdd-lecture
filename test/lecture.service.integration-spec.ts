import { DatabaseConfigModule, DatabaseConfigService } from '@config/database';
import { getDataSourceToken } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { LectureService } from '../src/lecture/application/services/lecture.service';
import { lectureServiceProvider } from '../src/lecture/application';
import {
  applicationRepositoryProvider,
  lectureRepositoryProvider,
  userRepositoryProvider,
} from '../src/lecture/infra';
import { mockLecture, mockUsers } from './helpers/mocks';
import { setConnectionForTx } from '../src/lib/decorators';
import { LectureEntity } from '../src/lecture/infra/entities/lecture.entity';
import { ApplicationEntity } from '../src/lecture/infra/entities/application.entity';

describe('LectureService (Integration)', () => {
  let lectureService: LectureService;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ envFilePath: '.env.test', isGlobal: true }),
        DatabaseConfigModule,
      ],
      providers: [
        lectureServiceProvider,
        lectureRepositoryProvider,
        userRepositoryProvider,
        applicationRepositoryProvider,
        {
          provide: getDataSourceToken(),
          useFactory: async (databaseConfig: DatabaseConfigService) => {
            const dataSource = new DataSource({
              type: databaseConfig.type,
              host: databaseConfig.host,
              port: databaseConfig.port,
              username: databaseConfig.username,
              password: databaseConfig.password,
              database: databaseConfig.database,
              entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
              synchronize: false,
              // logging: true,
            });
            await dataSource.initialize();
            return dataSource;
          },
          inject: [DatabaseConfigService],
        },
      ],
    }).compile();

    lectureService = moduleRef.get<LectureService>(LectureService);
    dataSource = moduleRef.get<DataSource>(getDataSourceToken());

    // Set connection for transaction
    setConnectionForTx(dataSource.createQueryRunner());
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  describe('동시성 테스트: 특강 신청', () => {
    afterAll(async () => {
      await dataSource.manager
        .createQueryBuilder()
        .delete()
        .from('applications')
        .execute();
    });

    it('50명이 동시에 특강을 신청할 때, 30명만 성공해야 합니다.', async () => {
      const promises = mockUsers.map(async (user) =>
        lectureService.apply(mockLecture.id, user.id),
      );

      await expect(Promise.all(promises)).rejects.toThrow();

      const applications = await dataSource.manager.find(ApplicationEntity);
      const lecture = await dataSource.manager.findOne(LectureEntity, {
        where: { id: mockLecture.id },
      });

      expect(applications.length).toBe(30);
      expect(lecture.remainingSeats).toBe(0);
    });
  });
});
