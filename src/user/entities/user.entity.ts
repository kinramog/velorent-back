import { Role } from 'src/role/entities/role.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fio: string;

    @Column()
    phone: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ type: 'int', default: 1 })
    tokenVersion: number;

    @ManyToOne(() => Role, role => role.users)
    @JoinColumn({ name: 'role_id' })
    role: Role;

    // @OneToMany(() => Rental, rental => rental.user)
    // rentals: Rental[];
}
