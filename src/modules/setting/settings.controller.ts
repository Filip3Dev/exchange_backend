import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	UseGuards,
	Put,
} from "@nestjs/common";
import { SettingsService } from "./settings.service";
import { CreateSettingDto, UpdateSettingDto } from "./dto/setting.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller("settings")
export class SettingsController {
	constructor(private readonly settingsService: SettingsService) {}

  @Post()
  @UseGuards(AuthGuard())
	create(@Body() createSettingDto: CreateSettingDto) {
		return this.settingsService.create(createSettingDto);
	}

  @Get()
  @UseGuards(AuthGuard())
  findAll() {
  	return this.settingsService.findAll();
  }

  @Get(":id")
  @UseGuards(AuthGuard())
  findOne(@Param("id") id: string) {
  	return this.settingsService.findOne(id);
  }

  @Put(":id")
  @UseGuards(AuthGuard())
  update(@Param("id") id: string, @Body() updateSettingDto: UpdateSettingDto) {
  	return this.settingsService.update(id, updateSettingDto);
  }
}
