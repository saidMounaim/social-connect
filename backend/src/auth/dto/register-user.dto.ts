import { IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @ValidateIf((o) => o.password !== o.repeatPassword)
  confirmPassword: string;
}
