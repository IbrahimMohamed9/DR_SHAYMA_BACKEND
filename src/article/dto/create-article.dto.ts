import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsUrl } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
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
  @IsString()
  subcategoryId: string;

  @ApiProperty({ type: 'boolean', default: true })
  @IsBoolean()
  isActive: boolean;
}
