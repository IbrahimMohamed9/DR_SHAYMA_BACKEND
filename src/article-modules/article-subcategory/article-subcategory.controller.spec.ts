import { Test, TestingModule } from '@nestjs/testing';
import { ArticleSubcategoryController } from './article-subcategory.controller';
import { ArticleSubcategoryService } from './article-subcategory.service';

describe('ArticleSubcategoryController', () => {
  let controller: ArticleSubcategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleSubcategoryController],
      providers: [ArticleSubcategoryService],
    }).compile();

    controller = module.get<ArticleSubcategoryController>(
      ArticleSubcategoryController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
