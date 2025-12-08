import { Bicycle } from 'src/bicycles/entities/bicycle.entity';
import { Station } from 'src/station/entities/station.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class StationBicycle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Station, station => station.station_bicycles)
  @JoinColumn({ name: 'station_id' })
  station: Station;

  @ManyToOne(() => Bicycle, bicycle => bicycle.station_bicycle)
  @JoinColumn({ name: 'bicycle_id' })
  bicycle: Bicycle;
}
