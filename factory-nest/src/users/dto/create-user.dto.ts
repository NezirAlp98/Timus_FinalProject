// create-user.dto.ts
import { IsString, IsEmail, MinLength, Matches, IsIn } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(8)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[A-Z])(?=.*\d)/, { message: 'Password must contain at least one uppercase letter and one numeric character' })
  password: string;

  @IsString()
  @IsIn(['admin', 'editor'])
  role: string;
}
