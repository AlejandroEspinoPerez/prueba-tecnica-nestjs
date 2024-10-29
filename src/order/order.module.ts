// src/order/order.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ClientModule } from 'src/client/client.module';
import { RestaurantModule } from 'src/restaurant/restaurant.module';

@Module({
    imports: [TypeOrmModule.forFeature([Order]),
        ClientModule,
    RestaurantModule],
    controllers: [OrderController],
    providers: [OrderService],
})
export class OrderModule { }
