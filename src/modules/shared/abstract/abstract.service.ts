import { DataTransferObjectInterface } from "../interface/dataTransferObject.interface";
import { ServiceInterface } from "../interface/service.interface";
import { EntityInterface } from "../interface/entity.interface";
import { MapperInterface } from "../interface/mapper.interface";
import { NotFoundException } from "@nestjs/common";

export class AbstractService<
  T extends EntityInterface,
  U extends DataTransferObjectInterface
> implements ServiceInterface<T, U>
{
	constructor(protected repository, protected mapper: MapperInterface<T, U>) {}

	async findAll(): Promise<T[]> {
		return await this.repository.findAll();
	}

	async findById(id: string): Promise<T> {
		const entity = await this.repository.findOne({ where: { id } });

		if (!entity) {
			throw new NotFoundException();
		}

		return entity;
	}
}
