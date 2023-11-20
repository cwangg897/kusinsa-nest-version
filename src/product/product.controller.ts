import {Body, Controller, Post} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() dto: CreateProductDto) {
    return this.productService.createProduct(dto);
  }
}
