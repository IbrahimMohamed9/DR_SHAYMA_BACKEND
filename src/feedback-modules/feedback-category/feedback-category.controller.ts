import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { FeedbackCategoryService } from './feedback-category.service';
import { CreateFeedbackCategoryDto } from './dto/create-feedback-category.dto';
import { UpdateFeedbackCategoryDto } from './dto/update-feedback-category.dto';
import { FeedbackCategory } from './entities/feedback-category.entity';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { OnlyAdminGuard } from 'src/auth/guards/only-admin.guard';

@Controller('feedback-categories')
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
  async create(@Body() createFeedbackCategoryDto: CreateFeedbackCategoryDto) {
    return await this.feedbackCategoryService.create(createFeedbackCategoryDto);
  }

  @ApiOperation({ summary: 'Get all feedback categories' })
  @ApiResponse({ status: 200, type: FeedbackCategory, isArray: true })
  @Get()
  async findAll() {
    return await this.feedbackCategoryService.findAll();
  }

  @ApiOperation({ summary: 'Get feedback category by id' })
  @ApiResponse({ status: 200, type: FeedbackCategory })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.feedbackCategoryService.findOne(id);
  }

  @ApiResponse({ status: 200, type: FeedbackCategory })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), OnlyAdminGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFeedbackCategoryDto: UpdateFeedbackCategoryDto,
  ) {
    return await this.feedbackCategoryService.update(
      id,
      updateFeedbackCategoryDto,
    );
  }

  @ApiResponse({ status: 204, description: 'Deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), OnlyAdminGuard)
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.feedbackCategoryService.remove(id);
  }
}
