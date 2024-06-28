import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseType } from '../../lib/types/common';

@Injectable()
export class DatabaseConfigService {
  constructor(private readonly configService: ConfigService) {}

  get type(): DatabaseType {
    return this.configService.get<DatabaseType>('database.type');
  }

  get host(): string {
    return this.configService.get<string>('database.host');
  }

  get port(): number {
    return this.configService.get<number>('database.port');
  }

  get username(): string {
    return this.configService.get<string>('database.username');
  }

  get password(): string {
    return this.configService.get<string>('database.password');
  }

  get database(): string {
    return this.configService.get<string>('database.name');
  }
}
