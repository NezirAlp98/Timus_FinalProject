import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { FactoryDetailService } from "./factory-detail.service";
import { CreateDetailDto } from "../dto/create-detail.dto";
import { UpdateDetailDto } from "../dto/update-detail.dto";



@Controller('details')
export class FactoryDetailController {
    constructor(private readonly factoryDetailService: FactoryDetailService) {}

    @Get()
   getAllFactoryDetails() {
        return this.factoryDetailService.getAllFactoryDetails();
    }

    @Get(':id')

    getFactoryDetail(@Param('id') id:string) {
        return this.factoryDetailService.getFactoryDetail(+id);
    }

    @Post()
     createFactoryDetail(@Body() createDetailDto:CreateDetailDto) {
        return this.factoryDetailService.createFactoryDetail(createDetailDto)
    }

    @Patch(':id')

    async updateFactoryDetail(@Param('id') id:string, @Body() updateDetailDto:UpdateDetailDto) {
        return this.factoryDetailService.updateFactoryDetail(+id, updateDetailDto)
    }

    @Delete(':id')

    async deleteFactoryDetail(@Param('id') id:string) {
        return this.factoryDetailService.deleteFactoryDetail(+id)
    }

}