import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  UseGuards,
  HttpCode,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { OnlyAdminGuard } from 'src/auth/guards/only-admin.guard';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @ApiOperation({ summary: 'Create new article' })
  @ApiResponse({ status: 201, type: Article })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBearerAuth()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @UseGuards(AuthGuard('jwt'), OnlyAdminGuard)
  @Post()
  async create(@Body() createArticleDto: CreateArticleDto) {
    try {
      return await this.articleService.create(createArticleDto);
    } catch (err) {
      if (err.message === 'Article subcategory not found') {
        throw new BadRequestException('Article subcategory not found');
      }

      throw new InternalServerErrorException();
    }
  }

  @ApiOperation({ summary: 'Get all articles' })
  @ApiResponse({ status: 200, type: [Article] })
  @Get()
  async findAll() {
    return await this.articleService.findAll();
  }

  @ApiOperation({ summary: 'Get article by id' })
  @ApiResponse({ status: 200, type: Article })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.articleService.findOne(+id);
  }

  @ApiOperation({ summary: 'Get articles by categoryId' })
  @ApiResponse({ status: 200, type: Article })
  @Get('category/id/:categoryId')
  async findByCategory(@Param('categoryId') categoryId: string) {
    return await this.articleService.findByCategoryId(+categoryId);
  }

  @ApiOperation({ summary: 'Get articles by categoryEn' })
  @ApiResponse({ status: 200, type: Article })
  @Get('category/en/:categoryEn')
  async findByCategoryEn(@Param('categoryEn') categoryEn: string) {
    return await this.articleService.findByCategoryEn(categoryEn);
  }

  @ApiOperation({ summary: 'Get articles by categoryAr' })
  @ApiResponse({ status: 200, type: Article })
  @Get('category/ar/:categoryAr')
  async findByCategoryAr(@Param('categoryAr') categoryAr: string) {
    return await this.articleService.findByCategoryAr(categoryAr);
  }

  @ApiOperation({ summary: 'Get articles by subcategoryId' })
  @ApiResponse({ status: 200, type: Article })
  @Get('subcategory/id/:subcategoryId')
  async findBySubcategory(@Param('subcategoryId') subcategoryId: string) {
    return await this.articleService.findBySubcategoryId(+subcategoryId);
  }

  @ApiOperation({ summary: 'Get articles by subcategoryEn' })
  @ApiResponse({ status: 200, type: Article })
  @Get('subcategory/en/:subcategoryEn')
  async findBySubcategoryEn(@Param('subcategoryEn') subcategoryEn: string) {
    return await this.articleService.findBySubcategoryEn(subcategoryEn);
  }

  @ApiOperation({ summary: 'Get articles by subcategoryEn' })
  @ApiResponse({ status: 200, type: Article })
  @Get('subcategory/ar/:subcategoryAr')
  async findBySubcategoryAr(@Param('subcategoryAr') subcategoryAr: string) {
    return await this.articleService.findBySubcategoryAr(subcategoryAr);
  }

  @ApiOperation({ summary: 'Update article by id' })
  @ApiResponse({ status: 200, type: UpdateArticleDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), OnlyAdminGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return await this.articleService.update(+id, updateArticleDto);
  }

  @ApiOperation({ summary: 'Delete article by id' })
  @ApiResponse({ status: 204, description: 'Deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), OnlyAdminGuard)
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.articleService.remove(+id);
  }
}
