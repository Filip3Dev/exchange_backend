import { IsNotEmpty, IsUUID, IsNumber, IsDateString } from "class-validator";

export class CreateSettingDto {
  @IsNotEmpty()
  @IsNumber()
  value: number;
}

export class UpdateSettingDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  value: number;
}

export class SettingResponseDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsDateString()
  createdAt: string;

  @IsDateString()
  updatedAt: string;
}
