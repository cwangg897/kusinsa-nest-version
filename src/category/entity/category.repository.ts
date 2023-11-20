import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Category } from './category.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';

@Injectable()
export class CategoryRepository {
  private categoryRepository: Repository<Category>;

  constructor(private readonly dataSource: DataSource) {
    this.categoryRepository = this.dataSource.getRepository(Category);
  }

  async exists(name: string) {
    return await this.categoryRepository.exist({
      where: {
        name,
      },
    });
  }

  async create(dto: CreateCategoryDto) {
    const category = this.categoryRepository.create({ ...dto });
    return await this.categoryRepository.save(category);
  }

  async findAll() {
    // paging
    return this.categoryRepository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  async findById(id: number) {
    return this.categoryRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(category: Category) {
    return this.categoryRepository.save(category);
  }

  async findByName(name: string) {
    return this.categoryRepository.findOne({
      where: {
        name,
      },
    });
  }
}
