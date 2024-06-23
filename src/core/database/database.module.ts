import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule, AppConfigService } from '@config/app';
import { DatabaseConfigModule, DatabaseConfigService } from '@config/database';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule, DatabaseConfigModule],
      useFactory: (
        appConfig: AppConfigService,
        databaseConfig: DatabaseConfigService,
      ) => ({
        type: databaseConfig.type,
        host: databaseConfig.host,
        port: databaseConfig.port,
        username: databaseConfig.username,
        password: databaseConfig.password,
        database: databaseConfig.database,
        entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
        synchronize: appConfig.nodeEnv === 'development',
      }),
      inject: [AppConfigService, DatabaseConfigService],
    }),
  ],
})
export class DatabaseModule {}
