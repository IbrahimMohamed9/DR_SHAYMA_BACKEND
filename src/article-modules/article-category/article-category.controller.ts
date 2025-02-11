import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArticleCategoryService } from './article-category.service';
import { CreateArticleCategoryDto } from './dto/create-article-category.dto';
import { UpdateArticleCategoryDto } from './dto/update-article-category.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OnlyAdminGuard } from 'src/auth/guards/only-admin.guard';

@Controller('article-category')
export class ArticleCategoryController {
  constructor(
    private readonly articleCategoryService: ArticleCategoryService,
  ) {}

  @ApiOperation({ summary: 'Create new article category' })
  @ApiResponse({ status: 201, type: CreateArticleCategoryDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBearerAuth()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @UseGuards(AuthGuard('jwt'), OnlyAdminGuard)
  @Post()
  create(@Body() createArticleCategoryDto: CreateArticleCategoryDto) {
    return this.articleCategoryService.create(createArticleCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all article category' })
  @ApiResponse({ status: 200, type: [CreateArticleCategoryDto] })
  findAll() {
    return this.articleCategoryService.findAll();
  }

  @ApiOperation({ summary: 'Get article category by id' })
  @ApiResponse({ status: 200, type: CreateArticleCategoryDto })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleCategoryService.findOne(id);
  }

  @ApiOperation({ summary: 'Update article category by id' })
  @ApiResponse({ status: 200, type: UpdateArticleCategoryDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), OnlyAdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateArticleCategoryDto: UpdateArticleCategoryDto,
  ) {
    return this.articleCategoryService.update(id, updateArticleCategoryDto);
  }

  @ApiOperation({ summary: 'Delete article by id' })
  @ApiResponse({ status: 204, description: 'Deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), OnlyAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleCategoryService.remove(id);
  }
}
