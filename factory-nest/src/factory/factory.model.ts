import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { FactoryDetail } from "./detail/factory-detail.model";

@Entity()
export class Factory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type:'date'})
    startDate: Date;

    @Column({ type:'date'})
    endDate: Date;

    @Column()
    employeeCount: number;

    @Column({default:false})
    isFree: boolean;

    @OneToMany(() => FactoryDetail, (factoryDetail:FactoryDetail) => factoryDetail.factory, 
    { onUpdate: "CASCADE", onDelete: "CASCADE" })
    details: FactoryDetail[];
}