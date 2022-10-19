import {
	forwardRef,
	Inject,
	Injectable,
	UnauthorizedException,
	HttpException,
	HttpStatus,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import jwt_decode from "jwt-decode";
import * as moment from "moment";
import { LoggerService } from "../shared/logger/logger.service";
import { AuthTokenDto, AuthRefreshTokenDto } from "./dto/auth.dto";
import {
	AuthResponseDto,
	AuthRefreshTokenResponseDto,
	AuthVerifyTokenDto,
} from "./dto/auth-response-token.dto";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { UserService } from "../user/user.service";
import { User } from "../user/entities/user.entity";

export interface JwtPayload {
  user: {
    id: string;
    username: string;
    email: string;
  };
}

@Injectable()
export class AuthService {
  private _signInExpiration;

  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly _userService: UserService,
    private readonly _loggerService: LoggerService,
    private readonly _jwtService: JwtService
  ) {
  	this._signInExpiration = parseInt(process.env.USER_SIGN_IN_EXPIRATION);
  }

  async signIn(
  	authCredentialsDto: AuthCredentialsDto
  ): Promise<AuthResponseDto> {
  	this._loggerService.info("auth.service signIn");

  	const user = await this._userService.findOneByEmail(
  		authCredentialsDto.email
  	);

  	if (!user) {
  		throw new UnauthorizedException(
  			"The email or password provided is invalid"
  		);
  	} else {
  		this._loggerService.info("auth.service signIn " + JSON.stringify(user));

  		const isValidPassword = await this._userService.verifyPassword(
  			authCredentialsDto.password,
  			user.password
  		);

  		if (isValidPassword) {
  			return await this.createAuth(user);
  		}

  		throw new UnauthorizedException(
  			"The email or password provided is invalid"
  		);
  	}
  }

  async updateAuthToken(
  	authRefreshToken: AuthRefreshTokenDto
  ): Promise<AuthRefreshTokenResponseDto> {
  	let refreshTokenDecode;

  	try {
  		refreshTokenDecode = jwt_decode(authRefreshToken.refreshToken);
  	} catch (error) {
  		throw new UnauthorizedException(error);
  	}

  	const user = await this._userService.getUserById(
  		refreshTokenDecode["user"]["id"]
  	);

  	const { accessToken, refreshToken } = await this.createAuth(user);

  	return { accessToken, refreshToken };
  }

  verifyToken(authDto: AuthTokenDto): AuthVerifyTokenDto {
  	try {
  		const accessTokenDecode = jwt_decode(authDto.accessToken);
  		let isValid = false;

  		if (accessTokenDecode["exp"]) {
  			const expiryDate = new Date(accessTokenDecode["exp"] * 1000);
  			new Date() < expiryDate ? (isValid = true) : (isValid = false);
  		} else {
  			isValid = true;
  		}

  		return { isValid };
  	} catch (error) {
  		throw new UnauthorizedException(error);
  	}
  }

  /* --------- Auxiliary Methods --------- */

  async createAuth(user: User): Promise<AuthResponseDto> {
  	const { username, email, id: id } = user;

  	const [refresh] = await Promise.all([
  		this.generateRefreshToken(id, this._signInExpiration),
  	]);

  	const payload = this.generateToken(user);
  	const accessToken = this._jwtService.sign(payload);

  	return {
  		user: { id, username, email },
  		accessToken,
  		refreshToken: refresh.refreshToken,
  	};
  }

  async generateRefreshToken(
  	userId: string,
  	expirationTime: number
  ): Promise<any> {
  	const refreshToken = this._jwtService.sign(
  		{ user: { id: userId } },
  		{
  			secret: process.env.SECRET_ACCESS_TOKEN,
  			expiresIn: expirationTime,
  		}
  	);

  	const refreshTokenExp = moment(new Date())
  		.add(2, "minute")
  		.format("YYYY/MM/DD HH:mm:ss");

  	return { refreshToken, refreshTokenExp };
  }

  private generateToken(user: User): Record<string, any> {
  	const { id: id, username, email } = user;

  	return {
  		user: {
  			id,
  			username,
  			email,
  		},
  	};
  }

  async validateUser(payload: JwtPayload): Promise<User> {
  	const user = await this._userService.getUserById(payload.user.id);
  	if (!user) {
  		throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
  	}
  	return user;
  }
}
