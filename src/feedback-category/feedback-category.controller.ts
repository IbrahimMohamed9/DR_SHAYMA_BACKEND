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

@Controller('feedback-category')
export class FeedbackCategoryController {
  constructor(
    private readonly feedbackCategoryService: FeedbackCategoryService,
  ) {}

  @Post()
  create(@Body() createFeedbackCategoryDto: CreateFeedbackCategoryDto) {
    return this.feedbackCategoryService.create(createFeedbackCategoryDto);
  }

  @Get()
  findAll() {
    return this.feedbackCategoryService.findAll();
  }

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
