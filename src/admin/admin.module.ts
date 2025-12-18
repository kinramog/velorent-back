import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { StorageModule } from "src/storage/storage.module";
import { Bicycle } from "src/bicycles/entities/bicycle.entity";
import { Rental } from "src/rental/entities/rental.entity";
import { Station } from "src/station/entities/station.entity";
import { User } from "src/user/entities/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Bicycle,
      Rental,
      User,
      Station,
    ]),
    StorageModule
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule { }
