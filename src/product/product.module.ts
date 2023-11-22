import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { CategoryModule } from '../category/category.module';
import { ProductRepository } from './entity/product.repository';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisCacheStore from 'cache-manager-ioredis';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    CategoryModule,
    CacheModule.register({
      store: redisCacheStore,
      host: 'localhost',
      port: 6379,
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  exports: [ProductRepository],
})
export class ProductModule {}
