import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryRepository } from './entity/category.repository';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async createCategory(dto: CreateCategoryDto) {
    const exists = await this.categoryRepository.exists(dto.name);
    if (exists) {
      throw new BadRequestException('이미 존재하는 카테고리 이름입니다');
    }
    return this.categoryRepository.create(dto);
  }

  async findAll() {
    return await this.categoryRepository.findAll();
  }

  async findById(id: number) {
    return this.categoryRepository.findById(id);
  }

  async updateById(dto: UpdateCategoryDto, id: number) {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new BadRequestException('존재하지 않는 id입니다');
    }
    const newCategory = {
      ...category,
      ...dto,
    };
    return this.categoryRepository.update(newCategory);
  }
}
