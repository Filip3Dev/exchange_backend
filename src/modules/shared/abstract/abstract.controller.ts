import { ServiceInterface } from "../interface/service.interface";
import { Get, Param, NotFoundException } from "@nestjs/common";

export abstract class AbstractController<T, U> {
	constructor(protected readonly service: ServiceInterface<T, U>) {}

  @Get()
	async findAll(): Promise<T[]> {
		return await this.service.findAll();
	}

  @Get(":id")
  async findById(@Param("id") id: string): Promise<T> {
  	const entity = await this.service.findById(id);

  	if (!entity) {
  		throw new NotFoundException();
  	}

  	return entity;
  }
}
