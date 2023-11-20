import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { ProductRepository } from './entity/product.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { CategoryRepository } from '../category/entity/category.repository';
import { UpdateProductDto } from './dto/update-product.dto';

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

  /**
   * 카테고리 변경도 가능하게 해야지
   */
  async updateProduct(dto: UpdateProductDto, id: number) {
    // update는 product를가져와서 대체해서 save시킴
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new BadRequestException('존재하지 않는 상품입니다');
    }
    //product에서 함께들고온 category를 업데이트해서 넣으면 안되는것인가?

    let category;
    let updateProduct;
    if (dto.categoryName) {
      category = await this.categoryRepository.findByName(dto.categoryName);
      if (!category) {
        throw new BadRequestException('존재하지 않는 카테고리입니다');
      }
      updateProduct = {
        ...product,
        ...dto,
        category,
      };
    } else {
      updateProduct = {
        ...product,
        ...dto,
      };
    }
    delete updateProduct.categoryName;
    // 당연히 그대로니까 변경이 안먹힘
    return this.productRepository.update(updateProduct);
  }

  async deleteProduct(id: number) {
    const result = await this.productRepository.deleteById(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return id;
  }
}
