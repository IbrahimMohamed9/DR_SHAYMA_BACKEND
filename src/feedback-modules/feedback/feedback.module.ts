import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { feedbackProviders } from './feedback.provider';
import { DatabaseModule } from 'src/database/database.module';
import { FeedbackCategoryModule } from '../feedback-category/feedback-category.module';

@Module({
  imports: [DatabaseModule, FeedbackCategoryModule],
  controllers: [FeedbackController],
  providers: [...feedbackProviders, FeedbackService],
})
export class FeedbackModule {}
