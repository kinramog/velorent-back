import { Bicycle } from "src/bicycles/entities/bicycle.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BicycleType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Bicycle, bicycle => bicycle.type)
    bicycles: Bicycle[];
}
