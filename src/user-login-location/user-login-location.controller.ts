import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserLoginLocationService } from './user-login-location.service';
import { CreateUserLoginLocationDto } from './dto/create-user-login-location.dto';
import { UpdateUserLoginLocationDto } from './dto/update-user-login-location.dto';

@Controller('user-login-location')
export class UserLoginLocationController {
  constructor(
    private readonly userLoginLocationService: UserLoginLocationService,
  ) {}

  @Post()
  create(@Body() createUserLoginLocationDto: CreateUserLoginLocationDto) {
    return this.userLoginLocationService.create(createUserLoginLocationDto);
  }

  @Get()
  findAll() {
    return this.userLoginLocationService.findAll();
  }

  @Get('with-user')
  findAllWithUser() {
    return this.userLoginLocationService.findAllWithUser();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userLoginLocationService.findOne(+id);
  }

  @Get(':id')
  findOneWithUser(@Param('id') id: string) {
    return this.userLoginLocationService.findOneWithUser(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserLoginLocationDto: UpdateUserLoginLocationDto,
  ) {
    return this.userLoginLocationService.update(
      +id,
      updateUserLoginLocationDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userLoginLocationService.remove(+id);
  }
}
