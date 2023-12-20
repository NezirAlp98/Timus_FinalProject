import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { FactoryService } from "./factory.service";
import { Factory } from "./factory.model";
import { CreateFactoryDto } from "./dto/create-factory.dto";
import { UpdateFactoryDto } from "./dto/update-factory.dto";


@Controller('factory')
export class FactoryController {
    constructor(private readonly factoryService: FactoryService) {}

    @Get()
   getAllFactories() {
        return this.factoryService.getAllFactories();
    }

    @Get(':id')

    getFactory(@Param('id') id:string) {
        return this.factoryService.getFactory(+id);
    }

    @Post()
     createFactory(@Body() createFactoryDto:CreateFactoryDto) {
        return this.factoryService.createFactory(createFactoryDto)
    }

    @Patch(':id')

    async updateFactory(@Param('id') id:string, @Body() updateFactoryDto:UpdateFactoryDto) {
        return this.factoryService.updateFactory(+id, updateFactoryDto)
    }

    @Delete(':id')

    async deleteFactory(@Param('id') id:string) {
        return this.factoryService.deleteFactory(+id)
    }

}