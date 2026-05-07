import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  getPostgresExtraConfig,
  getPostgresSslConfig,
} from './postgres-ssl.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.getOrThrow<string>('DATABASE_URL');
        const ssl = getPostgresSslConfig(
          databaseUrl,
          configService.get<string>('DATABASE_SSL'),
        );
        const extra = getPostgresExtraConfig(databaseUrl);

        return {
          type: 'postgres',
          url: databaseUrl,
          ...(ssl === undefined ? {} : { ssl }),
          ...(Object.keys(extra).length === 0 ? {} : { extra }),
          autoLoadEntities: true,
          synchronize: false,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
