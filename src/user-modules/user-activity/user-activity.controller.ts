import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserActivityService } from './user-activity.service';
import { CreateUserActivityDto } from './dto/create-user-activity.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserActivity } from './entities/user-activity.entity';
import { AuthGuard } from '@nestjs/passport';
import { MeAndAdminGuard } from 'src/auth/guards/me-and-admin.guard';
import { OnlyAdminGuard } from 'src/auth/guards/only-admin.guard';
import { OptionalJwtUser } from 'src/auth/decorators/optional-jwt-user.decorator';

@Controller('user-activity')
export class UserActivityController {
  constructor(private readonly userActivityService: UserActivityService) {}

  @ApiOperation({ summary: 'Create user activity' })
  @ApiResponse({ status: 201, type: UserActivity })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBearerAuth()
  @Post()
  async create(
    @Body() createUserActivityDto: CreateUserActivityDto,
    @OptionalJwtUser() user: any,
  ) {
    return await this.userActivityService.create(createUserActivityDto, user);
  }

  @ApiOperation({ summary: 'Get all user activities without user' })
  @ApiResponse({ status: 200, type: UserActivity, isArray: true })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), OnlyAdminGuard)
  @Get()
  async findAll() {
    return await this.userActivityService.findAll();
  }

  @ApiOperation({ summary: 'Get user activity by id without user' })
  @ApiResponse({ status: 200, type: UserActivity })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), OnlyAdminGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.userActivityService.findOne(+id);
    } catch (error) {
      if (error.message === 'User activity not found') {
        throw new NotFoundException('Not Found');
      }

      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  @ApiOperation({ summary: 'Get all user activity by userId without user' })
  @ApiResponse({ status: 200, type: UserActivity, isArray: true })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), MeAndAdminGuard)
  @Get('user/:userId')
  async findAllByUserId(@Param('userId') userId: string) {
    return await this.userActivityService.findAllByUserIdWithUser(+userId);
  }

  @ApiOperation({ summary: 'Get all user activities with user' })
  @ApiResponse({ status: 200, type: UserActivity, isArray: true })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), OnlyAdminGuard)
  @Get('with-user')
  async findAllWithUser() {
    return await this.userActivityService.findAllWithUser();
  }

  @ApiOperation({ summary: 'Get user activity by id with user' })
  @ApiResponse({ status: 200, type: UserActivity })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), OnlyAdminGuard)
  @Get('with-user/:id')
  async findOneWithUser(id: number) {
    try {
      return await this.userActivityService.findOneWithUser(+id);
    } catch (error) {
      if (error.message === 'User activity not found') {
        throw new NotFoundException('Not Found');
      }

      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  @ApiOperation({ summary: 'Get all user activity by userId with user' })
  @ApiResponse({ status: 200, type: UserActivity, isArray: true })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), MeAndAdminGuard)
  @Get('with-user/user/:userId')
  async findAllByUserIdWithUser(@Param('userId') userId: string) {
    return await this.userActivityService.findAllByUserIdWithUser(+userId);
  }
}
