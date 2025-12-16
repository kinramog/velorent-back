import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BicyclesModule } from './bicycles/bicycles.module';
import { BicycleModelModule } from './bicycle-model/bicycle-model.module';
import { StationModule } from './station/station.module';
import { Bicycle } from './bicycles/entities/bicycle.entity';
import { BicycleModel } from './bicycle-model/entities/bicycle-model.entity';
import { Station } from './station/entities/station.entity';
import { BicycleTypesModule } from './bicycle-types/bicycle-types.module';
import { BicycleType } from './bicycle-types/entities/bicycle-type.entity';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { RentalModule } from './rental/rental.module';
import { RentalStatusModule } from './rental-status/rental-status.module';
import { Rental } from './rental/entities/rental.entity';
import { RentalStatus } from './rental-status/entities/rental-status.entity';
import { User } from './user/entities/user.entity';
import { Role } from './role/entities/role.entity';
import { StorageModule } from './storage/storage.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
console.log(__dirname);
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Bicycle, BicycleModel, BicycleType, Station, Rental, RentalStatus, User, Role],
      synchronize: true,
      autoLoadEntities: true,

      logging: true,
    }),
    ServeStaticModule.forRoot({
      // __dirname = velorent-back/dist/
      // rootPath = velorent-back/dist/../{путь в бразуере}
      rootPath: join(__dirname, '..', ''),
      serveStaticOptions: {
        fallthrough: false,
      },
    }),
    BicyclesModule,
    BicycleModelModule,
    StationModule,
    BicycleTypesModule,
    UserModule,
    RoleModule,
    AuthModule,
    RentalModule,
    RentalStatusModule,
    StorageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
