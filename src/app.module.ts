import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { LoggerMiddleware } from './common/middleware/logger.middleware';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { BookService } from './books/books.service';
// import { BooksController } from './books/books.controller';
import { BookModule } from './books/books.module';

import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), BookModule, PrismaModule, UsersModule],
  // controllers: [AppController],
  // providers: [PrismaService],
  // exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('books');
  }
}
