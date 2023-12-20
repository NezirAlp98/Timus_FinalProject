import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FactoryDetail } from "./factory-detail.model";
import { CreateDetailDto } from "../dto/create-detail.dto";
import { UpdateDetailDto } from "../dto/update-detail.dto";




@Injectable()
export class FactoryDetailService {

    constructor(
        @InjectRepository(FactoryDetail)
        private readonly factoryDetailRepository: Repository<FactoryDetail>
    ) {}

    async getAllFactoryDetails() {
        return await this.factoryDetailRepository.find();
    }

    async getFactoryDetail(id:number) {
        return await this.factoryDetailRepository.findOne({where: {id}});
    }

    async createFactoryDetail(createDetailDto:CreateDetailDto) {
        const newFactory=this.factoryDetailRepository.create(createDetailDto)
        return await this.factoryDetailRepository.save(newFactory)
        
    }

    async updateFactoryDetail(id:number, updateDetailDto:UpdateDetailDto) {
        const updatedFactory= await this.factoryDetailRepository.findOne({where: {id}})
        if (!updatedFactory) {
            throw new NotFoundException("Factory not found")
        }

        Object.assign(updatedFactory, updateDetailDto);
        return await this.factoryDetailRepository.save(updatedFactory);
    }

    async deleteFactoryDetail(id:number) {
        const factory= await this.factoryDetailRepository.findOne({where: {id}})
        if (!factory) {
            throw new NotFoundException("Factory not found")
        }
        return await this.factoryDetailRepository.remove(factory)
    }
}