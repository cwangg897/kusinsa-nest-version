import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryRepository } from './entity/category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async createCategory(dto: CreateCategoryDto) {
    const exists = await this.categoryRepository.exists(dto.name);
    if (exists) {
      throw new BadRequestException('이미 존재하는 카테고리 이름입니다');
    }
    return this.categoryRepository.save(dto);
  }
}
