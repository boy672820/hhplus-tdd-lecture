import { AppConfigModule, AppConfigService } from '@config/app';
import { setConnectionForTx } from '@lib/decorators';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigModule, DatabaseConfigService } from '@config/database';
import { DataSource, DataSourceOptions } from 'typeorm';

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
        charset: 'utf8mb4_general_ci',
        synchronize: ['development', 'debug'].includes(appConfig.nodeEnv),
        logging: appConfig.nodeEnv === 'debug',
      }),
      inject: [AppConfigService, DatabaseConfigService],
      dataSourceFactory: async (options?: DataSourceOptions) => {
        if (!options) {
          throw new Error('Invalid options passed');
        }
        const dataSource = new DataSource(options);
        const connection = dataSource.createQueryRunner();
        setConnectionForTx(connection);
        return dataSource;
      },
    }),
  ],
})
export class DatabaseModule {}
