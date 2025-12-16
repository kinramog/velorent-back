import { BicycleModel } from "src/bicycle-model/entities/bicycle-model.entity";
import { Rental } from "src/rental/entities/rental.entity";
import { Station } from "src/station/entities/station.entity";
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, Entity, OneToMany, JoinColumn } from "typeorm";

@Entity()
export class Bicycle {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => BicycleModel, model => model.bicycles)
    @JoinColumn({ name: "model_id" })
    model: BicycleModel;

    @ManyToOne(() => Station, station => station.bicycles)
    @JoinColumn({ name: 'station_id' })
    station: Station;

    @OneToMany(() => Rental, rental => rental.bicycle)
    rentals: Rental[];
}
