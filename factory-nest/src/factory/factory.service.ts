import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Factory } from "./factory.model";
import { CreateFactoryDto } from "./dto/create-factory.dto";
import { UpdateFactoryDto } from "./dto/update-factory.dto";


@Injectable()
export class FactoryService {

    constructor(
        @InjectRepository(Factory)
        private readonly factoryRepository: Repository<Factory>
    ) {}

    async getAllFactories() {
        return await this.factoryRepository.find();
    }

    async getFactory(id:number) {
        return await this.factoryRepository.findOne({where: {id}});
    }

    async createFactory(createFactoryDto:CreateFactoryDto) {
        const newFactory=this.factoryRepository.create(createFactoryDto)
        return await this.factoryRepository.save(newFactory)
        
    }

    async updateFactory(id:number, updateFactoryDto:UpdateFactoryDto) {
        const updatedFactory= await this.factoryRepository.findOne({where: {id}})
        if (!updatedFactory) {
            throw new NotFoundException("Factory not found")
        }

        Object.assign(updatedFactory, updateFactoryDto);
        return await this.factoryRepository.save(updatedFactory);
    }

    async deleteFactory(id:number) {
        const factory= await this.factoryRepository.findOne({where: {id}})
        if (!factory) {
            throw new NotFoundException("Factory not found")
        }
        return await this.factoryRepository.remove(factory)
    }
}