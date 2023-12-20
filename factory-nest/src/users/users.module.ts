import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.model';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), ElasticsearchService],
  providers: [UsersService,ElasticsearchService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}