import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";
import { CreateDetailDto } from "./create-detail.dto";


export class CreateFactoryDto{

    @IsString()
    name:string;

    @IsDate()
    startDate:Date;

    @IsDate()
    endDate:Date;

    @IsNumber()
    employeeCount:number;

    @IsBoolean()
    isFree:boolean;
    
    details:CreateDetailDto[]
}