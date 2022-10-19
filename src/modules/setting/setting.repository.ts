import { EntityRepository, Repository } from "typeorm";
import { Setting } from "./entities/setting.entity";
import {
	CreateSettingDto,
	UpdateSettingDto,
	SettingResponseDto,
} from "./dto/setting.dto";
import { UnauthorizedException } from "@nestjs/common";

@EntityRepository(Setting)
export class SettingRepository extends Repository<Setting> {
	async findOneSetting(id: string): Promise<SettingResponseDto> {
		return await Setting.findOneOrFail({ id });
	}

	async createSetting(payload: CreateSettingDto): Promise<SettingResponseDto> {
		const newSetting = Setting.create(payload);
		return newSetting.save();
	}

	async updateSetting(
		id: string,
		payload: CreateSettingDto
	): Promise<SettingResponseDto> {
		const updateSetting = await Setting.update({ id }, payload);

		if (!updateSetting) {
			throw new UnauthorizedException();
		}
		const updated = await Setting.findOneOrFail({ id });

		return updated;
	}

	async allSettings(): Promise<SettingResponseDto[]> {
		const settings = await Setting.find({});

		return settings;
	}
}
