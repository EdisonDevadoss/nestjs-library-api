import { Injectable } from '@nestjs/common';

import { Book } from './interface';
import { CreateBookDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { paginate, paginatorResult } from 'src/lib/paginator-result';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}
  private readonly books: Book[] = [];

  create(data: CreateBookDto) {
    return this.prisma.book.create({ data: { ...data, created_by: 1 } });
    // return this.books.push(book);
  }

  async findAll(query: { page?: number; per_page?: number }) {
    const page = Number(query.page);
    const perPage = Number(query.per_page);
    const pages = page && page > 0 ? page : 1;
    const perPages = perPage && perPage > 0 ? perPage : 10;
    const skip = (pages - 1) * perPages;
    const take = perPages;
    return this.prisma
      .$transaction([
        this.prisma.book.findMany({
          skip,
          take,
        }),
        this.prisma.book.aggregate({
          skip,
          take,
          _count: true,
        }),
      ])
      .then((userRowsAndCount) => {
        const rowsAndCounts = {
          count: userRowsAndCount[1]._count,
          rows: userRowsAndCount[0],
        };
        const result = paginate(rowsAndCounts, perPages, pages);
        return paginatorResult(result, 'book');
      });
  }
}
