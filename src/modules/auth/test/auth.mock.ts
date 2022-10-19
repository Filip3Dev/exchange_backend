import {
  AuthForgotPasswordDto,
  AuthRecoverPasswordDto,
  AuthRefreshTokenDto,
  AuthTokenDto,
} from "../dto/auth.dto";
import {
  AuthRefreshTokenResponseDto,
  AuthResponseDto,
} from "../dto/auth-response-token.dto";
import { AuthCredentialsDto } from "../dto/auth-credentials.dto";
import { authExampleValues } from "../utils/auth.constants";
import { userExampleValues } from "../../user/utils/user.constants";

export class AuthMock {
  static mockAuthRefreshTokenDto(): AuthRefreshTokenDto {
    const authRefreshTokenDto = new AuthRefreshTokenDto();

    authRefreshTokenDto.refreshToken = authExampleValues.refreshToken;

    return authRefreshTokenDto;
  }

  static mockAuthTokenDto(): AuthTokenDto {
    const authTokenDto = new AuthTokenDto();

    authTokenDto.accessToken = authExampleValues.accessToken;

    return authTokenDto;
  }

  static mockAuthForgotPasswordDto(): AuthForgotPasswordDto {
    const authForgotPasswordDto = new AuthForgotPasswordDto();

    authForgotPasswordDto.email = userExampleValues.email;

    return authForgotPasswordDto;
  }

  static mockAuthCredentialsDto(): AuthCredentialsDto {
    const authCredentialsDto = new AuthCredentialsDto();

    authCredentialsDto.email = userExampleValues.email;
    authCredentialsDto.password = userExampleValues.password;

    return authCredentialsDto;
  }

  static mockAuthResponseDto(): AuthResponseDto {
    const response = new AuthResponseDto();

    response.user = authExampleValues.user;
    response.accessToken = authExampleValues.accessToken;
    response.refreshToken = authExampleValues.refreshToken;

    return response;
  }

  static mockAuthRefreshTokenResponseDto(): AuthRefreshTokenResponseDto {
    const response = new AuthRefreshTokenResponseDto();

    response.accessToken = authExampleValues.accessToken;
    response.refreshToken = authExampleValues.refreshToken;

    return response;
  }

  static mockTokenExpirationTime(): number {
    return authExampleValues.signInTokenExpiration;
  }

  static mockForgotPasswordResponse(): Record<string, any> {
    return { processed: true };
  }

  static mockRecoverPasswordResponse(): Record<string, any> {
    return { updated: true };
  }
}
