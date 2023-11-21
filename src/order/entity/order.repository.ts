import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrderRepository {
  private orderRepository: Repository<Order>;
  constructor(private readonly dataSource: DataSource) {

  }

}
