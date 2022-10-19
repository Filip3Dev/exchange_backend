import { LoggerService } from "./modules/shared/logger/logger.service";
import { SettingsService } from "./modules/setting/settings.service";
import { ExchangeService } from "./modules/exchange/exchange.service";
import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  _loggerService: LoggerService;
  _settingsService: SettingsService;

  constructor(
    private readonly loggerService: LoggerService,
    private readonly settingService: SettingsService,
    private readonly exchangeService: ExchangeService
  ) {
  	this._loggerService = loggerService;
  	this._settingsService = settingService;
  }

  @Get("exchange")
  async exchange() {
  	this._loggerService.info("controller exchange");
  	const setting = await this._settingsService.findAll();
  	const value = setting.length ? setting[0].value : 0;
  	const price = await this.exchangeService.getData();
  	const finalPrice = (value / 100) * price + price;
  	return { pair: "BTC/USD", value: finalPrice };
  }
}
