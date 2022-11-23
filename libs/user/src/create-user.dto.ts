import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail( { message: "Invalid Email format" } )
  email: string;

  @IsString({ message: "Password given is not a string" })
  @MinLength(6)
  password: string
}
