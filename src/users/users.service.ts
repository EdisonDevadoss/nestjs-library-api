import { Injectable } from '@nestjs/common';
import { paginate, paginatorResult } from 'src/lib/paginator-result';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    console.log('---', createUserDto);

    return this.prisma.user.create({ data: createUserDto });
    // return 'This action adds a new user';
  }

  findAll(query: { page?: number; per_page?: number }) {
    const page = Number(query.page);
    const perPage = Number(query.per_page);
    const pages = page && page > 0 ? page : 1;
    const perPages = perPage && perPage > 0 ? perPage : 10;
    const skip = (pages - 1) * perPages;
    const take = perPages;
    return this.prisma
      .$transaction([
        this.prisma.user.findMany({
          skip,
          take,
        }),
        this.prisma.user.aggregate({
          skip,
          take,
          _count: true,
        }),
      ])
      .then((bookRowsAndCount) => {
        const rowsAndCounts = {
          count: bookRowsAndCount[1]._count,
          rows: bookRowsAndCount[0],
        };
        const result = paginate(rowsAndCounts, perPages, pages);
        return paginatorResult(result, 'user');
      });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
