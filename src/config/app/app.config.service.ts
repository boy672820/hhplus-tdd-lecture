import { Environment } from '@lib/types/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get port(): number {
    return this.configService.get<number>('app.port');
  }

  get nodeEnv(): Environment {
    return this.configService.get<Environment>('app.nodeEnv');
  }
}
