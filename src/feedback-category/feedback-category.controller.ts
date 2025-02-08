import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FeedbackCategoryService } from './feedback-category.service';
import { CreateFeedbackCategoryDto } from './dto/create-feedback-category.dto';
import { UpdateFeedbackCategoryDto } from './dto/update-feedback-category.dto';
import { FeedbackCategory } from './entities/feedback-category.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('feedback-category')
export class FeedbackCategoryController {
  constructor(
    private readonly feedbackCategoryService: FeedbackCategoryService,
  ) {}

  @ApiOperation({ summary: 'Create new feedback category' })
  @ApiResponse({ status: 201, type: FeedbackCategory })
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

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFeedbackCategoryDto: UpdateFeedbackCategoryDto,
  ) {
    return this.feedbackCategoryService.update(id, updateFeedbackCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedbackCategoryService.remove(id);
  }
}
