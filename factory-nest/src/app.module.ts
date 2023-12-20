import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FactoryModule } from './factory/factory.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { FactoryDetailModule } from './factory/detail/factory-detail.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ElasticsearchModule, ElasticsearchService } from '@nestjs/elasticsearch';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService:ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [join(process.cwd(), 'dist/**/*.model{.ts,.js}')],
        synchronize: true,
      })
    }),
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        node: configService.get('ELASTICSEARCH_NODE'),
        username: configService.get('ELASTICSEARCH_USERNAME'),
        password: configService.get('ELASTICSEARCH_PASSWORD'),
      }),
    }),
    FactoryModule,
    FactoryDetailModule,
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService,ElasticsearchService],
})
export class AppModule {}
