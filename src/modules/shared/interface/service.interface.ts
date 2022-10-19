export interface ServiceInterface<T, U> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T>;
}
