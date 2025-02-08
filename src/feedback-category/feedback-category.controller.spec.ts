import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackCategoryController } from './feedback-category.controller';
import { FeedbackCategoryService } from './feedback-category.service';

describe('FeedbackCategoryController', () => {
  let controller: FeedbackCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbackCategoryController],
      providers: [FeedbackCategoryService],
    }).compile();

    controller = module.get<FeedbackCategoryController>(FeedbackCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
