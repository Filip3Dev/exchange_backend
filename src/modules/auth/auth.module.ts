import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { LoggerModule } from "../shared/logger/logger.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { UserService } from "../user/user.service";
import { DatabaseModule } from "../shared/database/database.module";
import { JwtStrategy } from "../shared/jwt/jwt-strategy";

@Module({
	imports: [
		DatabaseModule,
		ConfigModule.forRoot(),
		LoggerModule,
		UserModule,
		PassportModule.register({
			defaultStrategy: "jwt",
			property: "user",
			session: false,
		}),
		JwtModule.register({
			secret: process.env.SECRET_ACCESS_TOKEN,
			signOptions: {
				expiresIn: Number(process.env.SECRET_TIME_ACCESS_TOKEN),
			},
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, UserService, JwtStrategy],
	exports: [AuthService],
})
export class AuthModule {}
