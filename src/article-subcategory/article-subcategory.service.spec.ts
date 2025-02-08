import { Test, TestingModule } from '@nestjs/testing';
import { ArticleSubcategoryService } from './article-subcategory.service';

describe('ArticleSubcategoryService', () => {
  let service: ArticleSubcategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleSubcategoryService],
    }).compile();

    service = module.get<ArticleSubcategoryService>(ArticleSubcategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
