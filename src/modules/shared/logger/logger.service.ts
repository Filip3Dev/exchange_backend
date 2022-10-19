const createLogger = require("@bloq/service-logger");

export class LoggerService {
  _logger: any;

  constructor() {
  	this._logger = createLogger({
  		Console: {
  			level: "debug",
  		},
  	});
  }

  async info(msg: string) {
  	this._logger.info({ message: msg });
  }

  async infoObject(msg: string, object: any) {
  	this._logger.info(msg, object);
  }

  async warn(msg: string, object: any) {
  	this._logger.warn(msg, object);
  }

  async error(error: any) {
  	this._logger.error("Error", error);
  }
}
