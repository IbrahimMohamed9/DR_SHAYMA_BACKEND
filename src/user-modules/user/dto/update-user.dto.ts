import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsOptional, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ type: Boolean, example: true })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  active?: boolean;

  @ApiProperty({
    example:
      'https://the7eagles.com/wp-content/uploads/2024/05/Parts-of-Image-URL-1.webp',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  img?: string;
}
