import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  date_of_purchase: string;

  @ApiProperty()
  is_read: boolean;
}
