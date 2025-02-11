import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FeedbackCategoryService } from './feedback-category.service';
import { CreateFeedbackCategoryDto } from './dto/create-feedback-category.dto';
import { UpdateFeedbackCategoryDto } from './dto/update-feedback-category.dto';
import { FeedbackCategory } from './entities/feedback-category.entity';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { OnlyAdminGuard } from 'src/auth/guards/only-admin.guard';

@Controller('feedback-category')
export class FeedbackCategoryController {
  constructor(
    private readonly feedbackCategoryService: FeedbackCategoryService,
  ) {}

  @ApiOperation({ summary: 'Create new feedback category' })
  @ApiResponse({ status: 201, type: FeedbackCategory })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), OnlyAdminGuard)
  @Post()
  create(@Body() createFeedbackCategoryDto: CreateFeedbackCategoryDto) {
    return this.feedbackCategoryService.create(createFeedbackCategoryDto);
  }

  @ApiOperation({ summary: 'Get all feedback categories' })
  @ApiResponse({ status: 200, type: FeedbackCategory, isArray: true })
  @Get()
  findAll() {
    return this.feedbackCategoryService.findAll();
  }

  @ApiOperation({ summary: 'Get feedback category by id' })
  @ApiResponse({ status: 200, type: FeedbackCategory })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedbackCategoryService.findOne(id);
  }

  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), OnlyAdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFeedbackCategoryDto: UpdateFeedbackCategoryDto,
  ) {
    return this.feedbackCategoryService.update(id, updateFeedbackCategoryDto);
  }

  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), OnlyAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedbackCategoryService.remove(id);
  }
}
