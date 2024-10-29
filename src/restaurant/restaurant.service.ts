// src/restaurant/restaurant.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './restaurant.entity';


@Injectable()
export class RestaurantService {
    constructor(
        @InjectRepository(Restaurant) private restaurantRepository: Repository<Restaurant>,
    ) { }

    async create(restaurantData: Partial<Restaurant>) {
        return this.restaurantRepository.save(restaurantData);
    }

    async findAll() {
        return this.restaurantRepository.find({ relations: ['orders'] });
    }

    async findOne(id: number) {
        return this.restaurantRepository.findOne({
            where: { id },
            relations: ['orders'],
        });

    }

    async update(id: number, restaurantData: Partial<Restaurant>) {
        const restaurant = await this.findOne(id);
        Object.assign(restaurant, restaurantData);
        return this.restaurantRepository.save(restaurant);
    }

    async remove(id: number) {
        const restaurant = await this.findOne(id);
        if (!restaurant) {
            throw new BadRequestException(`El restaurante con ID ${id} no existe.`);
        }
        return this.restaurantRepository.remove(restaurant);
    }

}
