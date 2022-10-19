import {
	Controller,
	Post,
	Body,
	ValidationPipe,
	UseGuards,
} from "@nestjs/common";
import { AuthRefreshTokenDto, AuthTokenDto } from "./dto/auth.dto";
import {
	AuthResponseDto,
	AuthRefreshTokenResponseDto,
	AuthVerifyTokenDto,
} from "./dto/auth-response-token.dto";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { LoggerService } from "../shared/logger/logger.service";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
	constructor(
    private readonly _authService: AuthService,
    private readonly _loggerService: LoggerService
	) {}

  @Post("/signin")
	async signIn(
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    	authCredentialsDto: AuthCredentialsDto
	): Promise<AuthResponseDto> {
		this._loggerService.infoObject(
			"auth.controller signIn",
			authCredentialsDto
		);
		return this._authService.signIn(authCredentialsDto);
	}

  @Post("/verify-token")
  async check(
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    	authTokenDto: AuthTokenDto
  ): Promise<AuthVerifyTokenDto> {
  	this._loggerService.infoObject(
  		"auth.controller verify Token",
  		authTokenDto
  	);
  	return this._authService.verifyToken(authTokenDto);
  }

  @Post("/refresh-token")
  async refreshToken(
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    	authRefreshTokenDto: AuthRefreshTokenDto
  ): Promise<AuthRefreshTokenResponseDto> {
  	this._loggerService.infoObject(
  		"auth.controller refreshToken",
  		authRefreshTokenDto
  	);
  	return this._authService.updateAuthToken(authRefreshTokenDto);
  }
}
