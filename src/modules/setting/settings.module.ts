import { Module } from "@nestjs/common";
import { SettingsService } from "./settings.service";
import { SettingsController } from "./settings.controller";
import { DatabaseModule } from "../shared/database/database.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { SettingRepository } from "./setting.repository";

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
	controllers: [SettingsController],
	providers: [SettingsService, SettingRepository],
	exports: [SettingsService, SettingRepository],
})
export class SettingsModule {}
