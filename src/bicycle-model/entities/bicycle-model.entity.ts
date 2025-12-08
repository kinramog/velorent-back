import { Bicycle } from 'src/bicycles/entities/bicycle.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class BicycleModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Bicycle, bicycle => bicycle.model)
    bicycles: Bicycle[];
}
