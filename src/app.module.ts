import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user-modules/user/user.module';
import { UserLoginLocationModule } from './user-modules/user-login-location/user-login-location.module';
import { AuthModule } from './auth/auth.module';
import { UserActivityModule } from './user-modules/user-activity/user-activity.module';
import { VolunteerModule } from './volunteer/volunteer.module';
import { BookModule } from './book/book.module';
import { FeedbackModule } from './feedback-modules/feedback/feedback.module';
import { FeedbackCategoryModule } from './feedback-modules/feedback-category/feedback-category.module';
import { ArticleModule } from './article-modules/article/article.module';
import { ArticleCategoryModule } from './article-modules/article-category/article-category.module';
import { ArticleSubcategoryModule } from './article-modules/article-subcategory/article-subcategory.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    UserModule,
    UserLoginLocationModule,
    AuthModule,
    UserActivityModule,
    VolunteerModule,
    BookModule,
    FeedbackModule,
    FeedbackCategoryModule,
    ArticleModule,
    ArticleCategoryModule,
    ArticleSubcategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
