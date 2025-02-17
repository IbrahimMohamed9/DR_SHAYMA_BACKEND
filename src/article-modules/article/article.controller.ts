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
  @Get('category/:categoryId')
  async findByCategory(categoryId: string) {
    return await this.articleService.findByCategory(+categoryId);
  }

  @ApiOperation({ summary: 'Get articles by subcategoryId' })
  @ApiResponse({ status: 200, type: Article })
  @Get('subcategory/:subcategoryId')
  async findBySubcategory(subcategoryId: string) {
    return await this.articleService.findBySubcategory(+subcategoryId);
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
