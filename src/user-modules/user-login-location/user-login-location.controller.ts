import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserLoginLocationService } from './user-login-location.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserLoginLocation } from './entities/user-login-location.entity';
import { AuthGuard } from '@nestjs/passport';
import { OnlyAdminGuard } from 'src/auth/guards/only-admin.guard';
import { CreateUserLoginLocationDto } from './dto/create-user-login-location.dto';

@Controller('user-login-location')
export class UserLoginLocationController {
  constructor(
    private readonly userLoginLocationService: UserLoginLocationService,
  ) {}

  @ApiOperation({ summary: 'Get user login location without user' })
  @ApiResponse({ status: 200, type: [CreateUserLoginLocationDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), OnlyAdminGuard)
  @Get()
  findAll() {
    return this.userLoginLocationService.findAll();
  }

  @ApiOperation({
    summary: 'Get user login location without user by login location id',
  })
  @ApiResponse({ status: 200, type: CreateUserLoginLocationDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), OnlyAdminGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.userLoginLocationService.findOne(+id);
    if (!result) throw new NotFoundException('Not Found');

    return result;
  }

  @ApiOperation({ summary: 'Get user login location with user' })
  @ApiResponse({ status: 200, type: [UserLoginLocation] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), OnlyAdminGuard)
  @Get('with-use/user')
  findAllWithUser() {
    return this.userLoginLocationService.findAllWithUser();
  }

  @ApiOperation({ summary: 'Get user login location with user by id' })
  @ApiResponse({ status: 200, type: UserLoginLocation })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), OnlyAdminGuard)
  @Get('with-user/:id')
  findOneWithUser(@Param('id') id: string) {
    return this.userLoginLocationService.findOneWithUser(+id);
  }

  @ApiOperation({ summary: 'Get user login location by user id' })
  @ApiResponse({ status: 200, type: [CreateUserLoginLocationDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), OnlyAdminGuard)
  @Get('with-user/user/:userId')
  async findAllLoginLocationByUserId(@Param('userId') userId: string) {
    return this.userLoginLocationService.findAllLoginLocationByUserId(+userId);
  }
}
