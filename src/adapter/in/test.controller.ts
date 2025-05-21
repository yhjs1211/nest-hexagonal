import { Controller, Delete, Get, Inject, Patch, Post } from '@nestjs/common';
import { SYMBOL_TEST_SERVICE, TestService } from '../../application/service/test.service';

@Controller('test')
export class TestController {
  constructor(@Inject(SYMBOL_TEST_SERVICE) private readonly testService: TestService) {}

  @Get()
  test() {
    return this.testService.getTest();
  }

  @Post()
  testPost() {
    return this.testService.createTest();
  }

  @Patch()
  testPatch() {
    return this.testService.updateTest();
  }

  @Delete()
  testDelete() {
    return this.testService.deleteTest();
  }
}
