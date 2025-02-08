import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserActivityService } from './user-activity.service';
import { CreateUserActivityDto } from './dto/create-user-activity.dto';
import { UpdateUserActivityDto } from './dto/update-user-activity.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserActivity } from './entities/user-activity.entity';

@Controller('user-activity')
export class UserActivityController {
  constructor(private readonly userActivityService: UserActivityService) {}

  @Post()
  @ApiOperation({ summary: 'Create user activity' })
  @ApiResponse({ status: 201, type: UserActivity })
  create(@Body() createUserActivityDto: CreateUserActivityDto) {
    return this.userActivityService.create(createUserActivityDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all user activities' })
  @ApiResponse({ status: 200, type: UserActivity, isArray: true })
  findAll() {
    return this.userActivityService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user activity by id' })
  @ApiResponse({ status: 200, type: UserActivity })
  findOne(@Param('id') id: string) {
    return this.userActivityService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserActivityDto: UpdateUserActivityDto,
  ) {
    return this.userActivityService.update(+id, updateUserActivityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userActivityService.remove(+id);
  }
}
