// src/restaurant/restaurant.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';

@Module({
    imports: [TypeOrmModule.forFeature([Client])],
    controllers: [ClientController],
    providers: [ClientService],
    exports: [TypeOrmModule],  // Exporta para que otros módulos puedan usarlo
})
export class ClientModule { }
