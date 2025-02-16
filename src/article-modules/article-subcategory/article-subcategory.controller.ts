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
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ArticleSubcategoryService } from './article-subcategory.service';
import { CreateArticleSubcategoryDto } from './dto/create-article-subcategory.dto';
import { UpdateArticleSubcategoryDto } from './dto/update-article-subcategory.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ArticleSubcategory } from './entities/article-subcategory.entity';
import { AuthGuard } from '@nestjs/passport';
import { OnlyAdminGuard } from 'src/auth/guards/only-admin.guard';

@Controller('article-subcategory')
export class ArticleSubcategoryController {
  constructor(
    private readonly articleSubcategoryService: ArticleSubcategoryService,
  ) {}

  @ApiOperation({ summary: 'Create new article subcategory' })
  @ApiResponse({ status: 201, type: ArticleSubcategory })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBearerAuth()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @UseGuards(AuthGuard('jwt'), OnlyAdminGuard)
  @Post()
  async create(
    @Body() createArticleSubcategoryDto: CreateArticleSubcategoryDto,
  ) {
    try {
      return await this.articleSubcategoryService.create(
        createArticleSubcategoryDto,
      );
    } catch (error) {
      if (error.message === 'Category not found') {
        throw new BadRequestException('Category not found');
      } else if (error.message === 'Subcategory already exists') {
        throw new BadRequestException('Subcategory already exists');
      }

      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  @ApiOperation({ summary: 'get all article subcategories' })
  @ApiResponse({ status: 200, type: ArticleSubcategory, isArray: true })
  @Get()
  async findAll() {
    return await this.articleSubcategoryService.findAll();
  }

  @ApiOperation({ summary: 'get article subcategory by id' })
  @ApiResponse({ status: 200, type: ArticleSubcategory })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.articleSubcategoryService.findOne(id);
  }

  @ApiOperation({ summary: 'Update article subcategory by id' })
  @ApiResponse({ status: 200, type: ArticleSubcategory })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Subcategory not found' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), OnlyAdminGuard)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateArticleSubcategoryDto: UpdateArticleSubcategoryDto,
  ) {
    try {
      const updatedSubcategory = await this.articleSubcategoryService.update(
        id,
        updateArticleSubcategoryDto,
      );

      if (!updatedSubcategory) {
        throw new NotFoundException('Subcategory not found');
      }

      return updatedSubcategory;
    } catch (error) {
      if (error.message === 'Subcategory not found') {
        throw new NotFoundException(error.message);
      }
      if (error.message === 'New category not found') {
        throw new BadRequestException(error.message);
      }
      if (error.message === 'Subcategory with this ID already exists') {
        throw new ConflictException(error.message);
      }
      if (error.message.includes('Failed to update subcategory')) {
        throw new BadRequestException(error.message);
      }

      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }

  @ApiOperation({ summary: 'Delete article subcategory by id' })
  @ApiResponse({ status: 204, description: 'Deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), OnlyAdminGuard)
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.articleSubcategoryService.remove(id);
  }
}
