import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AuthService } from "src/modules/auth/auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.SECRET_ACCESS_TOKEN,
			passReqToCallback: true,
		});
	}

	async validate(req: Request, payload: any): Promise<any> {
		const user = await this.authService.validateUser(payload);

		if (!user) {
			throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
		}
		return user;
	}
}
