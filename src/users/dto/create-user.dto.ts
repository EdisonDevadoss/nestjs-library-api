import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail({ message: 'Email should be valid format' })
  email: string;

  @IsNotEmpty({ message: 'Name should be present' })
  name: string;
}
