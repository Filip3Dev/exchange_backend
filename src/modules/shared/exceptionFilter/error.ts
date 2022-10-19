import { HttpStatus } from "@nestjs/common";

export class Error {
	constructor(messageOriginal: any, messageFormated: any) {
		this.error = messageOriginal;
		this.message = messageFormated;
		this.statusCode = HttpStatus.NOT_ACCEPTABLE;
	}

  statusCode: HttpStatus;
  error: string;
  message: any;
}
