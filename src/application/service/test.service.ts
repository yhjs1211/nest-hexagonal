import { Injectable } from '@nestjs/common';
import { TestServiceUserCase } from '../port/in/test.service.use-case';

@Injectable()
export class TestService implements TestServiceUserCase {
  constructor() {}

  getTest() {
    return 'test';
  }

  createTest() {
    return 'testPost';
  }

  updateTest() {
    return 'testPatch';
  }

  deleteTest() {
    return 'testDelete';
  }
}

export const SYMBOL_TEST_SERVICE = Symbol('TEST_SERVICE');
