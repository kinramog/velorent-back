import { BicycleType } from 'src/bicycle-types/entities/bicycle-type.entity';
import { Bicycle } from 'src/bicycles/entities/bicycle.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
@Entity()
export class BicycleModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ type: 'decimal' })
    price_per_hour: number;

    @Column({ nullable: true })
    frame_size: number;

    @Column({ nullable: true })
    cyclist_min_height: number;

    @Column({ nullable: true })
    cyclist_max_height: number;

    @Column()
    img_path: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => BicycleType, model => model.bicycle_models)
    @JoinColumn({ name: "type_id" })
    type: BicycleType | null;

    @OneToMany(() => Bicycle, bicycle => bicycle.model)
    bicycles: Bicycle[];
}
