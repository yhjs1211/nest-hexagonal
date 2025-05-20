import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthCheckController {
  constructor() {}

  @Get()
  healthCheck() {
    return { success: true };
  }
}
