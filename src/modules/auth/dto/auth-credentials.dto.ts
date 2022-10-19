import { IsNotEmpty, IsEmail, IsString } from "class-validator";
export class AuthCredentialsDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
