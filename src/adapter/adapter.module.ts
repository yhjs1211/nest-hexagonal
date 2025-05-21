import { Module } from '@nestjs/common';
import { ApplicationModule } from '../application/application.module';
import { TestController } from './in/test.controller';

@Module({
  imports: [ApplicationModule],
  controllers: [TestController],
  providers: [],
})
export class AdapterModule {}
