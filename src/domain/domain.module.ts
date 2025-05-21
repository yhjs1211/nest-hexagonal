import { Module } from '@nestjs/common';
import { SYMBOL_MAPPER, Mapper } from './Mapper';

@Module({
  providers: [
    Mapper,
    {
      provide: SYMBOL_MAPPER,
      useClass: Mapper,
    },
  ],
  exports: [SYMBOL_MAPPER],
})
export class DomainModule {}
