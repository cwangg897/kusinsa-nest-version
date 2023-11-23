import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /categories', () => {
    let accessToken;
    beforeEach(async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'dhkdrb897@naver.com',
          password: '1234',
        })
        .expect(HttpStatus.CREATED);
      accessToken = response.body.accessToken;
    });

    test('success', async () => {
      return request(app.getHttpServer())
        .get('/categories')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(HttpStatus.FORBIDDEN); // 권한없음 ROOT만 가능해서
    });
  });
});
