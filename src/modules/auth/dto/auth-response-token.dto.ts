import { authExampleValues } from "../utils/auth.constants";

export class AuthRefreshTokenResponseDto {
  accessToken: string;
  refreshToken: string;
}

export class AuthResponseDto {
  user: Record<string, any>;
  accessToken: string;
  refreshToken: string;
}

export class AuthVerifyTokenDto {
  isValid: boolean;
}
