import { PartialType } from '@nestjs/swagger';
import { CreateFeedbackCategoryDto } from './create-feedback-category.dto';

export class UpdateFeedbackCategoryDto extends PartialType(
  CreateFeedbackCategoryDto,
) {}
