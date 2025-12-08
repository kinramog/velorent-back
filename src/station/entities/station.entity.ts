import { StationBicycle } from "src/station-bicycle/entities/station-bicycle.entity";
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

    @OneToMany(() => StationBicycle, sb => sb.station)
    station_bicycles: StationBicycle[];

    // @OneToMany(() => Rental, rental => rental.station)
    // rentals: Rental[];
}
