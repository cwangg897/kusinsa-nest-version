import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { TokeAuthGuard } from '../auth/guard/auth.guard';
import { RoleGuard } from '../auth/guard/role.guard';
import { HasRole } from '../auth/decorator/auth-role.decorator';
import { UserRole } from '../user/enum/roles.enum';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @HasRole(UserRole.ROOT)
  @UseGuards(TokeAuthGuard, RoleGuard)
  async createCategory(@Body() dto: CreateCategoryDto) {
    return this.categoryService.createCategory(dto);
  }
}
