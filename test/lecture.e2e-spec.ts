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
    describe('201 CREATED', () => {
      it('생성 성공', async () => {
        // Given
        const lectureId = 1;
        const userId = 1;

        // When
        const response = await request(app.getHttpServer())
          .post(`/lectures/${lectureId}/apply`)
          .send({ userId });

        // Then
        expect(response.statusCode).toBe(201);
      });
    });

    describe('400 BAD REQUEST', () => {
      it('잘못된 Body 정보', async () => {
        // Given
        const lectureId = 1;

        // When
        const response = await request(app.getHttpServer())
          .post(`/lectures/${lectureId}/apply`)
          .send({});

        // Then
        expect(response.statusCode).toBe(400);
      });
    });

    describe('404 NOT FOUND', () => {
      it('404 NOT FOUND', async () => {
        // Given
        const lectureId = 999;
        const userId = 1;

        // When
        const response = await request(app.getHttpServer())
          .post(`/lectures/${lectureId}/apply`)
          .send({ userId });

        // Then
        expect(response.statusCode).toBe(404);
      });
    });

    describe('401 UNAUTHORIZED', () => {
      it('사용자 정보를 찾을 수 없음', async () => {
        const lectureId = 1;
        const userId = 999;

        // When
        const response = await request(app.getHttpServer())
          .post(`/lectures/${lectureId}/apply`)
          .send({ userId });

        // Then
        expect(response.statusCode).toBe(409);
      });
    });

    describe('403 FORBIDDEN', () => {
      it('이미 마감됨', async () => {
        // Given
        const lectureId = 1;
        const userId = 1;

        // When
        const response = await request(app.getHttpServer())
          .post(`/lectures/${lectureId}/apply`)
          .send({ userId });

        // Then
        expect(response.statusCode).toBe(403);
      });
    });

    describe('409 CONFLICT', () => {
      it('중복 신청 (이미 신청함)', async () => {
        // Given
        const lectureId = 1;
        const userId = 1;

        // When
        await request(app.getHttpServer())
          .post(`/lectures/${lectureId}/apply`)
          .send({ userId });

        const response = await request(app.getHttpServer())
          .post(`/lectures/${lectureId}/apply`)
          .send({ userId });

        // Then
        expect(response.statusCode).toBe(409);
      });
    });
  });
});
