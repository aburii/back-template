import { IsEmail, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
    @IsEmail( { message: "Invalid Email format" } )
    email: string
}

export class UpdatePasswordDto {
    @IsString({ message: "Password given is not a string" })
    @MinLength(6)
    password?: string
}