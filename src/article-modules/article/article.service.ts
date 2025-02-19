import { ArticleSubcategoryService } from './../article-subcategory/article-subcategory.service';
import { Inject, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @Inject('ARTICLE_REPOSITORY')
    private articleRepository: Repository<Article>,
    private readonly articleSubcategoryService: ArticleSubcategoryService,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    const articleSubcategory = await this.articleSubcategoryService.findOne(
      createArticleDto.subcategoryId,
    );

    if (!articleSubcategory) {
      throw new Error('Article subcategory not found');
    }

    const newArticle = this.articleRepository.create(createArticleDto);
    return await this.articleRepository.save(newArticle);
  }

  async findAll() {
    return await this.articleRepository.find({
      relations: ['subcategory.category'],
    });
  }

  async findOne(id: number) {
    return await this.articleRepository.findOne({
      where: { id },
      relations: ['subcategory.category'],
    });
  }

  async findByCategoryId(categoryId: number) {
    return await this.articleRepository.find({
      where: { subcategory: { categoryId } },
      relations: ['subcategory.category'],
    });
  }

  async findBySubcategoryId(subcategoryId: number) {
    return await this.articleRepository.find({
      where: { subcategoryId },
      relations: ['subcategory.category'],
    });
  }

  async findBySubcategoryEn(subcategoryEn: string) {
    return await this.articleRepository.find({
      where: { subcategory: { subcategoryEn } },
      relations: ['subcategory.category'],
    });
  }

  async findBySubcategoryAr(subcategoryAr: string) {
    return await this.articleRepository.find({
      where: { subcategory: { subcategoryAr } },
      relations: ['subcategory.category'],
    });
  }

  async findByCategoryEn(categoryEn: string) {
    return await this.articleRepository.find({
      where: { subcategory: { category: { categoryEn } } },
      relations: ['subcategory.category'],
    });
  }

  async findByCategoryAr(categoryAr: string) {
    return await this.articleRepository.find({
      where: { subcategory: { category: { categoryAr } } },
      relations: ['subcategory.category'],
    });
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    await this.articleRepository.update(id, updateArticleDto);

    return await this.findOne(id);
  }

  async remove(id: number) {
    await this.articleRepository.delete(id);
  }
}
