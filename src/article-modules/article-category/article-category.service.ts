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

  async create(createArticleCategoryDto: CreateArticleCategoryDto) {
    const existingCategory = await this.findOne(
      createArticleCategoryDto.categoryId,
    );

    if (existingCategory) throw new Error('Article category already exists');

    const newCategory = this.articleCategoryRepository.create(
      createArticleCategoryDto,
    );
    return this.articleCategoryRepository.save(newCategory);
  }

  async findAll() {
    return await this.articleCategoryRepository.find();
  }

  async findOne(id: string) {
    return await this.articleCategoryRepository.findOne({
      where: { categoryId: id },
    });
  }

  async update(id: string, updateArticleCategoryDto: UpdateArticleCategoryDto) {
    const existingCurrentCategory =
      await this.articleCategoryRepository.findOne({
        where: { categoryId: id },
      });

    if (!existingCurrentCategory) throw new Error('Article category not found');

    const existingNewCategory = await this.articleCategoryRepository.findOne({
      where: { categoryId: updateArticleCategoryDto.categoryId },
    });

    if (existingNewCategory) {
      throw new Error('Article category already exists');
    }

    await this.articleCategoryRepository.update(id, updateArticleCategoryDto);
    return await this.findOne(updateArticleCategoryDto.categoryId);
  }

  async remove(id: string) {
    await this.articleCategoryRepository.delete(id);
  }
}
