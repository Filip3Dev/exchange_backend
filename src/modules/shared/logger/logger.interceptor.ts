import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
} from "@nestjs/common";
import { LoggerService } from "./logger.service";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  _loggerService: LoggerService;

  constructor(private readonly loggerService: LoggerService) {
  	this._loggerService = loggerService;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
  	this._loggerService.infoObject(
  		"request -> " +
        context.getArgs()[0].method +
        context.getArgs()[0].originalUrl,
  		context.getArgs()[0].body
  	);

  	return next.handle().pipe(
  		tap((result) => {
  			this._loggerService.infoObject("request out -> ", result);
  		})
  	);
  }
}
