import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { UserLoginLocationModule } from './user-login-location/user-login-location.module';
import { AuthModule } from './auth/auth.module';
import { UserActivityModule } from './user-activity/user-activity.module';
import { VolunteerModule } from './volunteer/volunteer.module';
import { BookModule } from './book/book.module';
import { FeedbackModule } from './feedback/feedback.module';
import { FeedbackCategoryModule } from './feedback-category/feedback-category.module';
import { ArticleModule } from './article/article.module';
import { ArticleCategoryModule } from './article-category/article-category.module';

@Module({
  imports: [
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
