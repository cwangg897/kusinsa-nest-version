import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.dev.env',
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql', // process로 1. 바꾸기 -> 2. 비동기로 바꾸기
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'kusinsa',
      entities: [User],
      synchronize: true,
    }),
    CommonModule,
    ConfigModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
