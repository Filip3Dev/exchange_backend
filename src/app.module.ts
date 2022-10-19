import { I18nJsonParser, I18nModule } from "nestjs-i18n";
import { PassportModule } from "@nestjs/passport";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import * as path from "path";
import { LoggerModule } from "./modules/shared/logger/logger.module";
import { JwtStrategy } from "./modules/shared/jwt/jwt-strategy";
import { AuthModule } from "./modules/auth/auth.module";
import { UserModule } from "./modules/user/user.module";
import { AppController } from "./app.controller";
import { SettingsModule } from "./modules/setting/settings.module";
import { ExchangeService } from "./modules/exchange/exchange.service";

@Module({
	imports: [
		ConfigModule.forRoot(),
		UserModule,
		AuthModule,
		LoggerModule,
		PassportModule.register({ defaultStrategy: "jwt" }),
		JwtModule.register({
			secret: process.env.SECRET_ACCESS_TOKEN,
		}),
		I18nModule.forRoot({
			fallbackLanguage: "en",
			parser: I18nJsonParser,
			parserOptions: {
				path: path.join(__dirname.replace("src", "translations")),
			},
		}),
		SettingsModule,
	],
	controllers: [AppController],
	providers: [JwtStrategy, ExchangeService],
})
export class AppModule {}
