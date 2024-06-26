import { Injectable } from '@nestjs/common';
import { ApplicationRepository } from '../../domain/repositories';

@Injectable()
export class ApplicationRepositoryImpl implements ApplicationRepository {
  constructor() {}

  async countBySession(): Promise<number> {
    throw new Error();
  }
}
