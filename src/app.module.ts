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
import { CategoryModule } from './category/category.module';
import { Product } from './product/entity/product.entity';
import { Category } from './category/entity/category.entity';
import { OrderModule } from './order/order.module';
import { Order } from './order/entity/order.entity';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisCacheStore from 'cache-manager-ioredis';

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
      entities: [User, Product, Category, Order],
      synchronize: true,
    }),
    CommonModule,
    ConfigModule,
    ProductModule,
    CategoryModule,
    OrderModule,
    CacheModule.register({
      store: redisCacheStore,
      host: 'localhost',
      port: 6379,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
  // 프로바이더에 넣어야함 원래는 {
  //       provide: APP_GUARD,
  //       useClass: RoleGuard,
  //     },
})
export class AppModule {}
