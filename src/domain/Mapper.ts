import { Injectable } from '@nestjs/common';

interface ContructableClass<T> {
  new (data: any): T;
}

@Injectable()
export class Mapper {
  constructor() {}

  mapToDomain<T>(data: any, domain: ContructableClass<T>): T {
    return new domain(data);
  }

  mapToDto<T>(data: any, dto: ContructableClass<T>): T {
    return new dto(data);
  }
}

export const SYMBOL_MAPPER = Symbol('MAPPER');
