import { PickType } from '@nestjs/mapped-types';
import { Product } from '../entity/product.entity';
import { IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

export class CreateProductDto extends PickType(Product, [
  'name',
  'price',
  'stock',
]) {
  @IsString()
  @Exclude({ toPlainOnly: true })
  categoryName: string; // 필수값이라서 optional이랑 ?를 안붙임

  // constructor(
  //   name: string,
  //   price: number,
  //   stock: number,
  //   categoryName: string,
  // ) {
  //   super(name, price, stock);
  //   this.categoryName = categoryName;
  // }
}
