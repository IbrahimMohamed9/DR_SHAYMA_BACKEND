import { ApiProperty } from '@nestjs/swagger';

export class CreateUserActivityDto {
  @ApiProperty({ example: 'Visited ${some post id}' })
  activity: string;
}
