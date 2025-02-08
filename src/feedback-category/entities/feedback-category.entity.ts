import { ApiProperty } from '@nestjs/swagger';
import { Feedback } from 'src/feedback/entities/feedback.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('feedback_category')
export class FeedbackCategory {
  @ApiProperty()
  @PrimaryColumn({ name: 'category_id' })
  category: string;

  @ApiProperty({ type: 'boolean', default: true })
  @Column('boolean', { name: 'is_active', default: true })
  isActive: boolean;

  @ApiProperty({ type: Feedback })
  @OneToMany(() => Feedback, (feedback) => feedback.feedbackCategory)
  feedbacks: Feedback[];
}
