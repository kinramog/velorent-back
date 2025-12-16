import { BicycleModel } from "src/bicycle-model/entities/bicycle-model.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BicycleType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => BicycleModel, bicycle_models => bicycle_models.type)
    bicycle_models: BicycleModel[];
}
