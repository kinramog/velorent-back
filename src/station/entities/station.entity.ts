import { Bicycle } from "src/bicycles/entities/bicycle.entity";
import { Rental } from "src/rental/entities/rental.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Station {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    img_path: string;

    @OneToMany(() => Bicycle, bicycle => bicycle.station)
    bicycles: Bicycle[];

    @OneToMany(() => Rental, rental => rental.station)
    rentals: Rental[];
}
