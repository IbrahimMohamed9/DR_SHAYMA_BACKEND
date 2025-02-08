import { Module } from '@nestjs/common';
import { FeedbackCategoryService } from './feedback-category.service';
import { FeedbackCategoryController } from './feedback-category.controller';
import { feedbackCategoryProviders } from './feedback-category.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FeedbackCategoryController],
  providers: [...feedbackCategoryProviders, FeedbackCategoryService],
})
export class FeedbackCategoryModule {}
