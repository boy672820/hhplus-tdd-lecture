import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { LectureModule } from '../src/lecture/lecture.module';
import * as request from 'supertest';

describe('LectureController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [LectureModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/lectures/apply (POST)', () => {
    it('201 CREATED', async () => {
      const userId = 1;

      const response = await request(app.getHttpServer())
        .post('/lectures/apply')
        .send({ userId });

      expect(response.statusCode).toBe(201);
    });

    it('400 BAD REQUEST', async () => {
      const response = await request(app.getHttpServer())
        .post('/lectures/apply')
        .send({});

      expect(response.statusCode).toBe(400);
    });
  });
});
