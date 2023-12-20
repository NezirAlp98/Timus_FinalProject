// update-user.dto.ts
import { IsString, IsEmail, MinLength, Matches, IsIn, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @MinLength(8)
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[A-Z])(?=.*\d)/, { message: 'Password must contain at least one uppercase letter and one numeric character' })
  @IsOptional()
  password?: string;

  @IsString()
  @IsIn(['admin', 'editor'])
  @IsOptional()
  role?: string;
}
