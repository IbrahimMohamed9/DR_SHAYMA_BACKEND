import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateArticleCategoryDto {
  @ApiProperty()
  @IsString()
  categoryId: string;
}
