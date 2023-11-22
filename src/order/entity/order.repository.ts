import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrderRepository {
  private orderRepository: Repository<Order>;
  constructor(private readonly dataSource: DataSource) {
    this.orderRepository = dataSource.getRepository(Order);
  }

  async findAll(id: number, limit: number, offset: number) {
    return this.orderRepository.find({
      where: {
        user: {
          id,
        },
      },
      order: {
        createdAt: 'DESC',
      },
      skip: offset,
      take: limit,
    });
  }

  async count(id: number) {
    return this.orderRepository.count({
      where: {
        user: {
          id,
        },
      },
    });
  }
}
