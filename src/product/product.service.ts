import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductRepository } from './entity/product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { CategoryRepository } from '../category/entity/category.repository';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  /**
   * 1. 이름으로 Category를 들고온다
   * 2. categoryId와 product이름을 통해 중복검사한다
   */
  async createProduct(dto: CreateProductDto) {
    // 중복체크 category아이디와
    const category = await this.categoryRepository.findByName(dto.categoryName);
    if (!category) {
      throw new BadRequestException('존재하지 않는 카테고리입니다');
    }
    const exists = await this.productRepository.existsByCategoryWithName(
      category.id,
      dto.name,
    );
    if (exists) {
      throw new BadRequestException('중복되는 상품이름입니다');
    }
    return this.productRepository.create(dto, category);
  }
}
