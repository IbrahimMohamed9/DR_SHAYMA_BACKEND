import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty({
    example:
      'https://the7eagles.com/wp-content/uploads/2024/05/Parts-of-Image-URL-1.webp',
  })
  @IsUrl()
  img: string;

  @ApiProperty({ required: false })
  @IsString()
  imgDescription?: string;

  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty({ required: false })
  @IsString()
  description?: string;

  // subcategory fk
  @ApiProperty()
  @IsNumber()
  subcategoryId: number;

  @ApiProperty({ type: 'boolean', default: true })
  @IsBoolean()
  isActive: boolean;
}
