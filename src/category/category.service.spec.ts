import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { CategoryRepository } from './entity/category.repository';
import { BadRequestException } from '@nestjs/common';

describe('CategoryService', () => {
  let categoryService: CategoryService;
  const categoryRepository = {
    findById: jest.fn(),
    exists: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService, CategoryRepository],
    })
      .overrideProvider(CategoryRepository)
      .useValue(categoryRepository)
      .compile();

    categoryService = module.get<CategoryService>(CategoryService);
  });

  test('should be defined', () => {
    expect(categoryService).toBeDefined();
  });

  describe('findById', () => {
    test('findById Success', async () => {
      const id = 1;
      await categoryService.findById(id);

      expect(categoryRepository.findById).toHaveBeenCalledWith(1);
      expect(categoryRepository.findById).toHaveBeenCalled();
    });

    test('findById Fail', async () => {
      const id = 1;
      const result = await categoryService.findById(id);
      // 여기서 categoryService의 결과가 undefined를 테스트하고싶어요인
      expect(result).toBeUndefined();
    });
  });

  describe('createCategory', () => {
    test('createCategory Success', async () => {
      const categoryName = '상의';
      const dto = {
        name: categoryName,
      };

      categoryRepository.exists.mockResolvedValue(false);
      await categoryService.createCategory(dto);

      expect(categoryRepository.exists).toHaveBeenCalled();
      expect(categoryRepository.create).toHaveBeenCalled();
    });

    test('createCategory Fail', async () => {
      const categoryName = '상의';
      const dto = {
        name: categoryName,
      };
      categoryRepository.exists.mockResolvedValue(true);
      await expect(categoryService.createCategory(dto)).rejects.toThrow(
        new BadRequestException('이미 존재하는 카테고리 이름입니다'),
      );
      expect(categoryRepository.exists).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    test('findAll', async () => {
      await categoryService.findAll();
      expect(categoryRepository.findAll).toHaveBeenCalled();
    });
  });

  describe('updateById', () => {
    test('updateById success', async () => {
      const dto = {
        name: '이름변경',
      };
      const id = 1;
      categoryRepository.findById.mockResolvedValue({
        name: '카테고리',
      });
      await categoryService.updateById(dto, id);

      // 상태체크를 못해 이러면
      expect(categoryRepository.findById).toHaveBeenCalled();
      expect(categoryRepository.update).toHaveBeenCalled();
    });

    test('updateById Fail', async () => {
      const dto = {
        name: '이름변경',
      };
      const id = 1;
      categoryRepository.findById.mockResolvedValue(undefined);
      expect(categoryService.updateById(dto, id)).rejects.toThrow(
        new BadRequestException('존재하지 않는 id입니다'),
      );
    });
  });
});
