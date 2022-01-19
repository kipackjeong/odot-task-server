import { IsEmail, IsString } from 'class-validator';
import { UserEntity } from '../entities/users.entity';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
