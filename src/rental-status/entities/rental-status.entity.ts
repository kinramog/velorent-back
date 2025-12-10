import { Rental } from 'src/rental/entities/rental.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class RentalStatus {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Rental, rental => rental.status)
    rentals: Rental[];
}
