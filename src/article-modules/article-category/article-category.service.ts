import { Inject, Injectable } from '@nestjs/common';
import { CreateArticleCategoryDto } from './dto/create-article-category.dto';
import { UpdateArticleCategoryDto } from './dto/update-article-category.dto';
import { Repository } from 'typeorm';
import { ArticleCategory } from './entities/article-category.entity';

@Injectable()
export class ArticleCategoryService {
  constructor(
    @Inject('ARTICLE_CATEGORY_REPOSITORY')
    private articleCategoryRepository: Repository<ArticleCategory>,
  ) {}

  async checkIfCategoryEnExists(categoryEn: string) {
    return await this.articleCategoryRepository.findOne({
      where: { categoryEn },
    });
  }

  async checkIfCategoryArExists(categoryAr: string) {
    return await this.articleCategoryRepository.findOne({
      where: { categoryAr },
    });
  }

  async ensureCategoryArAndEnDoNotExist(
    categoryAr: string,
    categoryEn: string,
  ) {
    const existingCategoryAr = await this.checkIfCategoryArExists(categoryAr);
    const existingCategoryEn = await this.checkIfCategoryEnExists(categoryEn);

    if (existingCategoryAr) {
      throw new Error('Article Arabic category already exists');
    }

    if (existingCategoryEn) {
      throw new Error('Article English category already exists');
    }
  }

  async create(category: CreateArticleCategoryDto) {
    await this.ensureCategoryArAndEnDoNotExist(
      category.categoryAr,
      category.categoryEn,
    );

    const newCategory = this.articleCategoryRepository.create(category);
    return this.articleCategoryRepository.save(newCategory);
  }

  async findAll() {
    return await this.articleCategoryRepository.find();
  }

  async findOne(id: number) {
    return await this.articleCategoryRepository.findOne({
      where: { categoryId: id },
    });
  }

  async update(id: string, newCategory: UpdateArticleCategoryDto) {
    await this.ensureCategoryArAndEnDoNotExist(
      newCategory.categoryAr,
      newCategory.categoryEn,
    );

    await this.articleCategoryRepository.update(id, newCategory);
    return await this.findOne(+id);
  }

  async remove(id: string) {
    await this.articleCategoryRepository.delete(id);
  }
}
