import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ArticleSubcategoryService } from './article-subcategory.service';
import { CreateArticleSubcategoryDto } from './dto/create-article-subcategory.dto';
import { UpdateArticleSubcategoryDto } from './dto/update-article-subcategory.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ArticleSubcategory } from './entities/article-subcategory.entity';

@Controller('article-subcategory')
export class ArticleSubcategoryController {
  constructor(
    private readonly articleSubcategoryService: ArticleSubcategoryService,
  ) {}

  @ApiOperation({ summary: 'Create new article subcategory' })
  @ApiResponse({ status: 201, type: ArticleSubcategory })
  @Post()
  create(@Body() createArticleSubcategoryDto: CreateArticleSubcategoryDto) {
    return this.articleSubcategoryService.create(createArticleSubcategoryDto);
  }

  @ApiOperation({ summary: 'get all article subcategories' })
  @ApiResponse({ status: 200, type: ArticleSubcategory, isArray: true })
  @Get()
  findAll() {
    return this.articleSubcategoryService.findAll();
  }

  @ApiOperation({ summary: 'get article subcategory by id' })
  @ApiResponse({ status: 200, type: ArticleSubcategory })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleSubcategoryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateArticleSubcategoryDto: UpdateArticleSubcategoryDto,
  ) {
    return this.articleSubcategoryService.update(
      id,
      updateArticleSubcategoryDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleSubcategoryService.remove(id);
  }
}
