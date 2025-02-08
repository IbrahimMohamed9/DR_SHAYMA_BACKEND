import { PartialType } from '@nestjs/swagger';
import { CreateUserLoginLocationDto } from './create-user-login-location.dto';

export class UpdateUserLoginLocationDto extends PartialType(
  CreateUserLoginLocationDto,
) {}
