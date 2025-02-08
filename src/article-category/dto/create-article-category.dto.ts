import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleCategoryDto {
  @ApiProperty()
  categoryId: string;
}
