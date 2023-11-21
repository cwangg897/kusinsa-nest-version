import {Body, ClassSerializerInterceptor, Controller, Post, UseGuards, UseInterceptors} from '@nestjs/common';
import { OrderService } from './order.service';
import { TokeAuthGuard } from '../auth/guard/auth.guard';
import { RoleGuard } from '../auth/guard/role.guard';
import { HasRole } from '../auth/decorator/auth-role.decorator';
import { UserRole } from '../user/enum/roles.enum';
import { User } from '../user/entity/user.entity';
import {LoginUser} from '../user/decorator/user.decorator';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HasRole(UserRole.USER)
  @UseGuards(TokeAuthGuard, RoleGuard)
  @UseInterceptors(ClassSerializerInterceptor) // 요청전과 후를 할려면 인터셉터를 사용함
  async createOrder(@Body() dto: CreateOrderDto, @LoginUser() user: User) {
    return this.orderService.createOrder(dto, user);
  }
}
