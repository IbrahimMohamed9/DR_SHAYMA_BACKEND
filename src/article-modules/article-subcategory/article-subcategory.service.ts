import { Inject, Injectable } from '@nestjs/common';
import { CreateArticleSubcategoryDto } from './dto/create-article-subcategory.dto';
import { UpdateArticleSubcategoryDto } from './dto/update-article-subcategory.dto';
import { Repository } from 'typeorm';
import { ArticleSubcategory } from './entities/article-subcategory.entity';
import { ArticleCategoryService } from '../article-category/article-category.service';

@Injectable()
export class ArticleSubcategoryService {
  constructor(
    @Inject('ARTICLE_SUBCATEGORY_REPOSITORY')
    private articleSubcategoryRepository: Repository<ArticleSubcategory>,
    private readonly articleCategoryService: ArticleCategoryService,
  ) {}

  async checkIfSubcategoryEnExists(subcategoryEn: string) {
    return await this.articleSubcategoryRepository.findOne({
      where: { subcategoryEn },
    });
  }

  async checkIfSubcategoryArExists(subcategoryAr: string) {
    return await this.articleSubcategoryRepository.findOne({
      where: { subcategoryAr },
    });
  }

  async ensureSubcategoryArAndEnDoNotExist(
    subcategoryAr: string,
    subcategoryEn: string,
  ) {
    const existingSubcategoryAr =
      await this.checkIfSubcategoryArExists(subcategoryAr);
    const existingSubcategoryEn =
      await this.checkIfSubcategoryEnExists(subcategoryEn);

    if (existingSubcategoryAr) {
      throw new Error('Article Arabic subcategory already exists');
    }

    if (existingSubcategoryEn) {
      throw new Error('Article English subcategory already exists');
    }
  }
  async create(createArticleSubcategoryDto: CreateArticleSubcategoryDto) {
    const category = await this.articleCategoryService.findOne(
      createArticleSubcategoryDto.categoryId,
    );

    if (!category) {
      throw new Error('Category not found');
    }

    await this.ensureSubcategoryArAndEnDoNotExist(
      createArticleSubcategoryDto.subcategoryAr,
      createArticleSubcategoryDto.subcategoryEn,
    );

    const newVolunteer = this.articleSubcategoryRepository.create(
      createArticleSubcategoryDto,
    );
    return await this.articleSubcategoryRepository.save(newVolunteer);
  }

  async findAll() {
    return await this.articleSubcategoryRepository.find();
  }

  async findOne(id: number) {
    return await this.articleSubcategoryRepository.findOne({
      where: { subcategoryId: id },
    });
  }

  async findByCategory(category: number) {
    return await this.articleSubcategoryRepository.find({
      where: { categoryId: category },
    });
  }

  async update(
    id: number,
    updateArticleSubcategoryDto: UpdateArticleSubcategoryDto,
  ) {
    const existingSubcategory = await this.findOne(id);
    if (!existingSubcategory) {
      throw new Error('Subcategory not found');
    }

    if (updateArticleSubcategoryDto.categoryId) {
      const category = await this.articleCategoryService.findOne(
        updateArticleSubcategoryDto.categoryId,
      );
      if (!category) {
        throw new Error('New category not found');
      }
    }

    if (updateArticleSubcategoryDto.subcategoryId) {
      const subcategory = await this.findOne(
        updateArticleSubcategoryDto.subcategoryId,
      );
      if (subcategory) {
        throw new Error('Subcategory with this ID already exists');
      }
    }

    await this.articleSubcategoryRepository.update(
      id,
      updateArticleSubcategoryDto,
    );

    const newId = updateArticleSubcategoryDto.subcategoryId || id;
    return await this.findOne(newId);
  }

  async remove(id: string) {
    await this.articleSubcategoryRepository.delete(id);
  }
}
