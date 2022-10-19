import {
	CannotCreateEntityIdMapError,
	EntityNotFoundError,
	QueryFailedError,
	TypeORMError,
} from "typeorm";
import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
	Logger,
} from "@nestjs/common";
import { Request, Response } from "express";
import { Error } from "./error";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost): void {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();

		let message: any = "Internal Server Error",
			code = "InternalServerErrorException",
			status = 500;

		if (exception instanceof HttpException) {
			message = (exception as any).response.message;
			status = (exception as any).getStatus();
			code = (exception as any).name;
		}

		switch (exception.constructor) {
		case TypeORMError:
			message = (exception as TypeORMError).message;
			break;

		case QueryFailedError:
			status = HttpStatus.UNPROCESSABLE_ENTITY;
			message = (exception as any as QueryFailedError).message;
			code = (exception as any).code;
			break;

		case EntityNotFoundError:
			status = HttpStatus.UNPROCESSABLE_ENTITY;
			message = (exception as any as EntityNotFoundError).message;
			code = (exception as any).code;
			break;

		case CannotCreateEntityIdMapError:
			status = HttpStatus.UNPROCESSABLE_ENTITY;
			message = (exception as CannotCreateEntityIdMapError).message;
			code = (exception as any).code;
			break;

		case HttpException:
		default:
			break;
		}

		Logger.error(
			message,
			(exception as any).stack,
			`${request.method} ${request.url}`
		);

		const error = new Error(null, null);

		error.error = code;
		error.statusCode = status;
		error.message = Array.isArray(message) ? message : [message];

		response.status(status).json(error);
	}
}
