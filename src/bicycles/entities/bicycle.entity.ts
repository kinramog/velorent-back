import { BicycleModel } from "src/bicycle-model/entities/bicycle-model.entity";
import { BicycleType } from "src/bicycle-types/entities/bicycle-type.entity";
import { Rental } from "src/rental/entities/rental.entity";
import { StationBicycle } from "src/station-bicycle/entities/station-bicycle.entity";
import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, Entity, OneToMany, JoinColumn } from "typeorm";

@Entity()
export class Bicycle {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ type: 'decimal' })
    price_per_hour: number;

    @Column()
    quantity: number;

    @Column()
    img_path: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => BicycleModel, model => model.bicycles)
    @JoinColumn({ name: "model_id" })
    model: BicycleModel;

    @ManyToOne(() => BicycleType, model => model.bicycles)
    @JoinColumn({ name: "type_id" })
    type: BicycleType;

    @OneToMany(() => StationBicycle, sb => sb.bicycle)
    station_bicycle: StationBicycle[];

    @OneToMany(() => Rental, rental => rental.bicycle)
    rentals: Rental[];

}
