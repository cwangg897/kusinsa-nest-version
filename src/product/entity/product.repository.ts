import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { Category } from '../../category/entity/category.entity';

@Injectable()
export class ProductRepository {
  private productRepository: Repository<Product>;

  constructor(private readonly dataSource: DataSource) {
    this.productRepository = dataSource.getRepository(Product);
  }

  async create(
    dto: Omit<CreateProductDto, 'categoryName'>,
    category: Category,
  ) {
    const product = this.productRepository.create({
      ...dto,
      category,
    });
    return this.productRepository.save(product);
  }

  async existsByCategoryWithName(id: number, name: string) {
    return this.productRepository.exist({
      where: {
        category: { id },
        name,
      },
    });
  }

  async findById(id: number) {
    return this.productRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findByIdWithCategory(id: number) {
    return this.productRepository.findOne({
      where: {
        id,
      },
      relations: {
        category: true,
      },
    });
  }

  async update(product: Product) {
    return this.productRepository.save(product);
  }
}
