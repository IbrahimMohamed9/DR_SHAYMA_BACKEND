import {
  Controller,
  Get,
  InternalServerErrorException,
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
  async findAll() {
    return await this.userLoginLocationService.findAll();
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
    try {
      return await this.userLoginLocationService.findOne(+id);
    } catch (error) {
      if (error.message === 'User login location not found') {
        throw new NotFoundException('Not Found');
      }

      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  @ApiOperation({ summary: 'Get user login location by user id without user' })
  @ApiResponse({ status: 200, type: [CreateUserLoginLocationDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), OnlyAdminGuard)
  @Get('user/:userId')
  async findAllLoginLocationByUserId(@Param('userId') userId: string) {
    return await this.userLoginLocationService.findAllLoginLocationByUserId(
      +userId,
    );
  }

  @ApiOperation({ summary: 'Get user login location with user' })
  @ApiResponse({ status: 200, type: [UserLoginLocation] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), OnlyAdminGuard)
  @Get('with-use')
  async findAllWithUser() {
    return await this.userLoginLocationService.findAllWithUser();
  }

  @ApiOperation({ summary: 'Get user login location with user by id' })
  @ApiResponse({ status: 200, type: UserLoginLocation })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), OnlyAdminGuard)
  @Get('with-user/:id')
  async findOneWithUser(@Param('id') id: string) {
    try {
      return await this.userLoginLocationService.findOneWithUser(+id);
    } catch (error) {
      if (error.message === 'User login location not found') {
        throw new NotFoundException('Not Found');
      }

      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  @ApiOperation({ summary: 'Get user login location by user id with user' })
  @ApiResponse({ status: 200, type: [CreateUserLoginLocationDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), OnlyAdminGuard)
  @Get('with-user/user/:userId')
  async findAllLoginLocationByUserIdWithUser(@Param('userId') userId: string) {
    return await this.userLoginLocationService.findAllLoginLocationByUserIdWithUser(
      +userId,
    );
  }
}
