import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UserActivityService } from './user-activity.service';
import { CreateUserActivityDto } from './dto/create-user-activity.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserActivity } from './entities/user-activity.entity';
import { AuthGuard } from '@nestjs/passport';
import { OnlyMeGuard } from 'src/auth/guards/only-me.guard';
import { MeAndAdminGuard } from 'src/auth/guards/me-and-admin.guard';
import { OnlyAdminGuard } from 'src/auth/guards/only-admin.guard';

@Controller('user-activity')
export class UserActivityController {
  constructor(private readonly userActivityService: UserActivityService) {}

  @ApiOperation({ summary: 'Create user activity' })
  @ApiResponse({ status: 201, type: UserActivity })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), OnlyMeGuard)
  @Post()
  create(@Body() createUserActivityDto: CreateUserActivityDto) {
    return this.userActivityService.create(createUserActivityDto);
  }

  @ApiOperation({ summary: 'Get all user activities' })
  @ApiResponse({ status: 200, type: UserActivity, isArray: true })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), MeAndAdminGuard)
  @Get()
  findAll() {
    return this.userActivityService.findAll();
  }

  @ApiOperation({ summary: 'Get user activity by id' })
  @ApiResponse({ status: 200, type: UserActivity })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), OnlyAdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userActivityService.findOne(+id);
  }
}
