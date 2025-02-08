import { Controller, Get, Param } from '@nestjs/common';
import { UserLoginLocationService } from './user-login-location.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserLoginLocation } from './entities/user-login-location.entity';

@Controller('user-login-location')
export class UserLoginLocationController {
  constructor(
    private readonly userLoginLocationService: UserLoginLocationService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get user login location without user' })
  @ApiResponse({ status: 200, type: UserLoginLocation })
  findAll() {
    return this.userLoginLocationService.findAll();
  }

  @Get('with-user')
  @ApiOperation({ summary: 'Get user login location with user' })
  @ApiResponse({ status: 200, type: UserLoginLocation })
  findAllWithUser() {
    return this.userLoginLocationService.findAllWithUser();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user login location without user by id' })
  @ApiResponse({ status: 200, type: UserLoginLocation })
  findOne(@Param('id') id: string) {
    return this.userLoginLocationService.findOne(+id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user login location with user by id' })
  @ApiResponse({ status: 200, type: UserLoginLocation })
  findOneWithUser(@Param('id') id: string) {
    return this.userLoginLocationService.findOneWithUser(+id);
  }
}
