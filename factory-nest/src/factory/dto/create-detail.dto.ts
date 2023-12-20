import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsString } from "class-validator";
import { Factory } from "../factory.model";
import { CreateFactoryDto } from "./create-factory.dto";


export class CreateDetailDto{
    
    @IsNotEmpty()
    @IsString()
    usingUnit:string;

    @IsArray()
    @IsNotEmpty()
    dateRange:[Date,Date];

    @IsNotEmpty()
    @IsInt()
    usageKW:number;

    @IsNotEmpty()
    @IsInt()
    usagePrice:number;

    @IsNotEmpty()
    @IsBoolean()
    isDiscounted:boolean;

    factory:CreateFactoryDto;

}