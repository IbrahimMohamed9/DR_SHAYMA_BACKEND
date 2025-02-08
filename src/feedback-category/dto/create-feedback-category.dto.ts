import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateFeedbackCategoryDto {
  @ApiProperty()
  @IsString()
  category: string;

  @ApiProperty({ type: 'boolean', default: true })
  isActive: boolean;
}
