import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { ProductModule } from '../product/product.module';
import { UserModule } from '../user/user.module';
import {OrderRepository} from './entity/order.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), ProductModule, UserModule],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
