import { DataTransferObjectInterface } from "./dataTransferObject.interface";
import { EntityInterface } from "./entity.interface";

export interface MapperInterface<
  T extends EntityInterface,
  U extends DataTransferObjectInterface
> {
  toDto(origem: T): U;
  toEntity(origem: U): T;
}
