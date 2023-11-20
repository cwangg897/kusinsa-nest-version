import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from '../user/entity/user.entity';
import {Product} from './entity/product.entity';
import {CategoryModule} from '../category/category.module';
import {ProductRepository} from './entity/product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CategoryModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule {}
