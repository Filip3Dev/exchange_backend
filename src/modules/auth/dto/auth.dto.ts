import { IsNotEmpty, IsEmail, IsString } from "class-validator";

export class AuthDto {
  id: string;
  token: string;
  isExpired: boolean;
}

export class AuthRefreshTokenDto {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}

export class AuthTokenDto {
  @IsNotEmpty()
  @IsString()
  accessToken: string;
}

export class AuthForgotPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class AuthRecoverPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  resetPasswordToken: string;
}
