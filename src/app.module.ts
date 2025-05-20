import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdapterModule } from './adapter/adapter.module';
import { HealthCheckController } from './health-check.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'development' ? '.env' : '.env.production',
    }),
    AdapterModule,
  ],
  controllers: [HealthCheckController],
  providers: [],
})
export class AppModule {}
