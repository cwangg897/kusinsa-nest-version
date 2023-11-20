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

  async save(dto: CreateCategoryDto) {
    const category = this.categoryRepository.create({ ...dto });
    return await this.categoryRepository.save(category);
  }
}
