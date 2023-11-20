import { PickType } from '@nestjs/mapped-types';
import { Product } from '../entity/product.entity';
import { IsString } from 'class-validator';

export class CreateProductDto extends PickType(Product, [
  'name',
  'price',
  'stock',
]) {
  @IsString()
  categoryName: string; // 필수값이라서 optional이랑 ?를 안붙임
}
