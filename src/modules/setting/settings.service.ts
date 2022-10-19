import { Injectable } from "@nestjs/common";
import { SettingRepository } from "./setting.repository";
import {
	CreateSettingDto,
	SettingResponseDto,
	UpdateSettingDto,
} from "./dto/setting.dto";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class SettingsService {
	constructor(
    @InjectRepository(SettingRepository)
    private readonly _settingRepository: SettingRepository
	) {}

	async create(
		createSettingDto: CreateSettingDto
	): Promise<SettingResponseDto> {
		const setting: SettingResponseDto =
      await this._settingRepository.createSetting(createSettingDto);
		return setting;
	}

	findAll(): Promise<SettingResponseDto[]> {
		return this._settingRepository.allSettings();
	}

	async findOne(id: string): Promise<SettingResponseDto> {
		const user: SettingResponseDto =
      await this._settingRepository.findOneSetting(id);
		return user;
	}

	async update(
		id: string,
		updateSettingDto: UpdateSettingDto
	): Promise<SettingResponseDto> {
		const updated: SettingResponseDto =
      await this._settingRepository.updateSetting(id, updateSettingDto);
		return updated;
	}
}
