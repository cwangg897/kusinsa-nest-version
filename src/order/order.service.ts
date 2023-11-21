import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrderRepository } from './entity/order.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { User } from '../user/entity/user.entity';
import { ProductRepository } from '../product/entity/product.repository';
import { UserRepository } from '../user/entity/user.repository';
import { DataSource } from 'typeorm';
import { Product } from '../product/entity/product.entity';
import { Order } from './entity/order.entity';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productRepository: ProductRepository,
    private readonly userRepository: UserRepository,
    private dataSource: DataSource,
  ) {}

  /**
   * 동시성처리
   * 수량 동시성
   */
  async createOrder(dto: CreateOrderDto, user: User) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const product = await queryRunner.manager.findOne(Product, {
        where: {
          id: dto.productId,
        },
        lock: { mode: 'pessimistic_write' },
      });
      if (!product) {
        throw new NotFoundException('상품이 존재하지 않습니다');
      }
      if (product.stock < dto.quantity) {
        throw new BadRequestException('상품 수량이 부족합니다');
      }
      product.stock -= dto.quantity;
      const findUser = await queryRunner.manager.findOne(User, {
        where: {
          id: user.id,
        },
      });

      const orderEntity = queryRunner.manager.create(Order, {
        ...dto,
        user: findUser,
        product,
      });

      const newOrder = await queryRunner.manager.save(Order, orderEntity);
      await queryRunner.commitTransaction();
      return newOrder;
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }
}
