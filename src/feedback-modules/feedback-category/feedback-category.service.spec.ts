import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackCategoryService } from './feedback-category.service';

describe('FeedbackCategoryService', () => {
  let service: FeedbackCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedbackCategoryService],
    }).compile();

    service = module.get<FeedbackCategoryService>(FeedbackCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
