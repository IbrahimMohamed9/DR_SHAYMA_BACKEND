import { ApiProperty } from '@nestjs/swagger';
import { FeedbackCategory } from 'src/feedback-modules/feedback-category/entities/feedback-category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Feedback {
  @ApiProperty({ required: false })
  @PrimaryGeneratedColumn({ name: 'feedback_id' })
  id: number;

  @ApiProperty()
  @Column()
  message: string;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty({ required: false })
  @Column({ name: 'sender_name', nullable: true })
  name: string;

  @ApiProperty({ required: false })
  @Column({ name: 'sender_email', nullable: true })
  email: string;

  @ApiProperty({ required: false })
  @Column({ name: 'sender_phone', nullable: true })
  phoneNumber: string;

  @ApiProperty()
  @Column({ name: 'category_id' })
  categoryId: string;

  @ApiProperty()
  @ManyToOne(() => FeedbackCategory, (fC) => fC.feedbacks)
  @JoinColumn({ name: 'category_id' })
  feedbackCategory: FeedbackCategory;
}
