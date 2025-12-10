import { Bicycle } from 'src/bicycles/entities/bicycle.entity';
import { RentalStatus } from 'src/rental-status/entities/rental-status.entity';
import { Station } from 'src/station/entities/station.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Rental {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp' })
    start_time: Date;

    @Column({ type: 'timestamp' })
    end_time: Date;

    @Column({ type: 'timestamp', nullable: true })
    start_time_actual: Date;

    @Column({ type: 'timestamp', nullable: true })
    end_time_actual: Date;

    @Column({ type: 'decimal' })
    total_price: number;

    @ManyToOne(() => Station, station => station.rentals)
    @JoinColumn({ name: 'station_id' })
    station: Station;

    @ManyToOne(() => User, user => user.rentals)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Bicycle, bicycle => bicycle.rentals)
    @JoinColumn({ name: 'bicycle_id' })
    bicycle: Bicycle;

    @ManyToOne(() => RentalStatus, status => status.rentals)
    @JoinColumn({ name: 'status_id' })
    status: RentalStatus;
}
