import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Bicycle } from "src/bicycles/entities/bicycle.entity";
import { RentalStatusEnum } from "src/rental/constants/rental-status.enum";
import { Rental } from "src/rental/entities/rental.entity";
import { Station } from "src/station/entities/station.entity";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Bicycle)
        private readonly bicycleRepo: Repository<Bicycle>,

        @InjectRepository(Rental)
        private readonly rentalRepo: Repository<Rental>,

        @InjectRepository(User)
        private readonly userRepo: Repository<User>,

        @InjectRepository(Station)
        private readonly stationRepo: Repository<Station>,
    ) {}

    async getDashboardStats() {
        const [
            totalBicycles,
            activeRentals,
            totalUsers,
            stations,
        ] = await Promise.all([
            this.bicycleRepo.count(),
            this.rentalRepo.count({
                where: { status: { id: RentalStatusEnum.ACTIVE } },
            }),
            this.userRepo.count(),
            this.stationRepo.count(),
        ]);

        return {
            totalBicycles,
            activeRentals,
            totalUsers,
            stations,
        };
    }
}
