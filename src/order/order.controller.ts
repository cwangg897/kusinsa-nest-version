import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import { OrderService } from './order.service';
import { TokeAuthGuard } from '../auth/guard/auth.guard';
import { RoleGuard } from '../auth/guard/role.guard';
import { HasRole } from '../auth/decorator/auth-role.decorator';
import { UserRole } from '../user/enum/roles.enum';
import { User } from '../user/entity/user.entity';
import {LoginUser} from '../user/decorator/user.decorator';
import {CreateOrderDto} from './dto/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HasRole(UserRole.USER)
  @UseGuards(TokeAuthGuard, RoleGuard)
  async createOrder(@Body() dto: CreateOrderDto, @LoginUser() user: User) {
    return this.orderService.createOrder(dto, user);
  }
}
