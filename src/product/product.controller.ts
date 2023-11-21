import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PageRequest } from '../common/page/page-request-dto';
import {CacheInterceptor} from '@nestjs/cache-manager';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() dto: CreateProductDto) {
    return this.productService.createProduct(dto);
  }

  @Patch(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async updateProduct(@Body() dto: UpdateProductDto, @Param('id') id: number) {
    return this.productService.updateProduct(dto, id);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number) {
    return this.productService.deleteProduct(id);
  }

  // 작동을 하는지 모르겠음
  @Get()
  @UseInterceptors(CacheInterceptor)
  async findAllProduct(@Query() page: PageRequest) {
    return this.productService.findAllProduct(page);
  }
}
