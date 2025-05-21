import { Module } from '@nestjs/common';
import { DomainModule } from '../domain/domain.module';
import { SYMBOL_TEST_SERVICE, TestService } from './service/test.service';

@Module({
  imports: [DomainModule],
  providers: [
    {
      provide: SYMBOL_TEST_SERVICE,
      useClass: TestService,
    },
  ],
  exports: [SYMBOL_TEST_SERVICE],
})
export class ApplicationModule {}
