// src/restaurant/restaurant.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './restaurant.entity';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Restaurant])],
    controllers: [RestaurantController],
    providers: [RestaurantService],
    exports: [TypeOrmModule], // ¡Asegúrate de exportar el módulo!
})
export class RestaurantModule { }
