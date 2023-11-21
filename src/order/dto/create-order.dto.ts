import { PickType } from '@nestjs/mapped-types';
import { Order } from '../entity/order.entity';

export class CreateOrderDto extends PickType(Order, [
  'totalPrice',
  'quantity',
]) {
  productId: number;
}
