import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Factory } from "../factory.model";


@Entity()
export class FactoryDetail{
   
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    usingUnit:string;

    @Column({type:"daterange"})
    dateRange:[Date,Date];

    @Column()
    usageKW:number;

    @Column()
    usagePrice:number;

    @Column({default:false})
    isDiscounted:boolean;

    @ManyToOne(() => Factory, (factory:Factory) => factory.details, 
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    factory: Factory;

} 