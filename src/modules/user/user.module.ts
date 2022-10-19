import { DatabaseModule } from "../shared/database/database.module";
import { UserRepository } from "./user.repository";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

@Module({
	imports: [
		DatabaseModule,
		PassportModule.register({ defaultStrategy: "jwt" }),
		JwtModule.register({
			secret: process.env.USER_HMG_SECRET_ACCESS_TOKEN,
			signOptions: {
				expiresIn: Number(process.env.USER_HMG_SECRET_TIME_ACCESS_TOKEN),
			},
		}),
	],
	controllers: [UserController],
	providers: [UserService, UserRepository],
	exports: [UserService, UserRepository],
})
export class UserModule {}
