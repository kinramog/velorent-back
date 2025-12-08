import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BicyclesModule } from './bicycles/bicycles.module';
import { BicycleModelModule } from './bicycle-model/bicycle-model.module';
import { StationModule } from './station/station.module';
import { StationBicycleModule } from './station-bicycle/station-bicycle.module';
import { Bicycle } from './bicycles/entities/bicycle.entity';
import { BicycleModel } from './bicycle-model/entities/bicycle-model.entity';
import { Station } from './station/entities/station.entity';
import { StationBicycle } from './station-bicycle/entities/station-bicycle.entity';
import { BicycleTypesModule } from './bicycle-types/bicycle-types.module';
import { BicycleType } from './bicycle-types/entities/bicycle-type.entity';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';

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
      entities: [Bicycle, BicycleModel, BicycleType, Station, StationBicycle],
      synchronize: true,
      autoLoadEntities: true,

      logging: true,
    }),
    BicyclesModule,
    BicycleModelModule,
    StationModule,
    StationBicycleModule,
    BicycleTypesModule,
    UserModule,
    RoleModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
