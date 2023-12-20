import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FactoryDetail } from "./factory-detail.model";
import { FactoryDetailController } from "./factory-detail.controller";
import { FactoryDetailService } from "./factory-detail.service";



@Module({
    imports:[TypeOrmModule.forFeature([FactoryDetail])],
    controllers:[FactoryDetailController],
    providers:[FactoryDetailService],
})

export class FactoryDetailModule {}


