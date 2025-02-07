import { PartialType } from '@nestjs/mapped-types';
import { CreateUserLoginLocationDto } from './create-user-login-location.dto';

export class UpdateUserLoginLocationDto extends PartialType(
  CreateUserLoginLocationDto,
) {}
