import { HttpExceptionFilter } from "./modules/shared/exceptionFilter/http-exception.filter";
import { LoggerInterceptor } from "./modules/shared/logger/logger.interceptor";
import { LoggerService } from "./modules/shared/logger/logger.service";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
declare const module: any;

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		bufferLogs: true,
	});

	const _loggerService = new LoggerService();
	app.useGlobalInterceptors(new LoggerInterceptor(_loggerService));
	app.useGlobalFilters(new HttpExceptionFilter());

	app.enableCors({
		origin: ["http://localhost:3000"],
		methods: "GET, PUT, POST, DELETE, PATCH",
		allowedHeaders: "Content-Type, Authorization",
	});

	await app.listen(process.env.PORT);
}
bootstrap();
