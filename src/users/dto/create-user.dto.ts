import { IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from '../interface/user.interface';

export class CreateUserDto {
  @IsEmail({ message: 'Email should be valid format' })
  email: string;

  @IsNotEmpty({ message: 'Name should be present' })
  name: string;

  @IsNotEmpty({ message: 'Hash should be present' })
  hash: string;

  role: Role;
}
