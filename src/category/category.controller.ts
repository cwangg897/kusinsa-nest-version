import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe, Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { TokeAuthGuard } from '../auth/guard/auth.guard';
import { RoleGuard } from '../auth/guard/role.guard';
import { HasRole } from '../auth/decorator/auth-role.decorator';
import { UserRole } from '../user/enum/roles.enum';
import {UpdateCategoryDto} from './dto/update-category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @HasRole(UserRole.ROOT)
  @UseGuards(TokeAuthGuard, RoleGuard)
  async createCategory(@Body() dto: CreateCategoryDto) {
    return this.categoryService.createCategory(dto);
  }

  @Get()
  @HasRole(UserRole.ROOT)
  @UseGuards(TokeAuthGuard, RoleGuard)
  async findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @HasRole(UserRole.ROOT)
  @UseGuards(TokeAuthGuard, RoleGuard)
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.findById(id);
  }

  @Patch(':id')
  async updateById(@Body() dto: UpdateCategoryDto, @Param('id') id: number) {
    return this.categoryService.updateById(dto, id);
  }
}
