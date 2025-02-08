import { ApiProperty } from '@nestjs/swagger';
import { Feedback } from 'src/feedback/entities/feedback.entity';
import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('feedback_category')
export class FeedbackCategory {
  @ApiProperty()
  @PrimaryColumn({ name: 'category_id' })
  category: string;

  @ApiProperty({ type: Feedback })
  @ManyToOne(() => Feedback, (feedback) => feedback.feedbackCategory)
  feedbacks: Feedback[];
}
