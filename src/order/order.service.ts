import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Client } from '../client/client.entity';
import { Restaurant } from '../restaurant/restaurant.entity';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(Client) private clientRepository: Repository<Client>,
        @InjectRepository(Restaurant) private restaurantRepository: Repository<Restaurant>,
    ) { }

    async create(orderData: CreateOrderDto) {
        // Buscar al cliente
        const client = await this.clientRepository.findOne({ where: { id: orderData.clientId } });
        if (!client) {
            throw new NotFoundException('Cliente no encontrado.');
        }
        if (client.age < 18) {
            throw new BadRequestException('El cliente debe ser mayor de edad.');
        }

        // Buscar el restaurante con sus órdenes
        const restaurant = await this.restaurantRepository.findOne({
            where: { id: orderData.restaurantId },
            relations: ['orders'],
        });
        if (!restaurant) {
            throw new NotFoundException('Restaurante no encontrado.');
        }

        // Validar la capacidad del restaurante
        await this.validateCapacity(restaurant, client.id);

        // Crear la orden
        const order = this.orderRepository.create({
            description: orderData.description,
            client, // asigna directamente el cliente encontrado
            restaurant, // asigna directamente el restaurante encontrado
        });

        // Guardar la orden
        try {
            return await this.orderRepository.save(order);
        } catch (error) {
            console.error('Error al guardar la orden:', error);
            throw new InternalServerErrorException('No se pudo crear la orden.');
        }
    }


    async validateCapacity(restaurant: Restaurant, clientId: number) {
        // Obtener todos los clientes únicos que han hecho órdenes en el restaurante
        const uniqueClientCount = await this.orderRepository
            .createQueryBuilder('order')
            .where('order.restaurantId = :restaurantId', { restaurantId: restaurant.id })
            .select('order.clientId')
            .distinct(true)
            .getCount();

        // Verificar si el cliente actual ya tiene una orden en el restaurante
        const clientAlreadyInRestaurant = await this.orderRepository.findOne({
            where: { client: { id: clientId }, restaurant: { id: restaurant.id } },
        });

        // Si la capacidad máxima se alcanzó y el cliente no está registrado, lanzar excepción
        if (uniqueClientCount >= restaurant.capacity && !clientAlreadyInRestaurant) {
            console.error('Capacidad máxima alcanzada para este restaurante.');
            throw new BadRequestException('Capacidad máxima alcanzada para este restaurante.');
        }
    }

    async findAll() {
        return this.orderRepository.find({ relations: ['client', 'restaurant'] });
    }

    async findOne(id: number) {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: ['client', 'restaurant'],
        });
        if (!order) {
            throw new NotFoundException('Orden no encontrada.');
        }
        return order;
    }

    async update(id: number, orderData: CreateOrderDto) {
        const order = await this.findOne(id);
        Object.assign(order, orderData);
        return this.orderRepository.save(order);
    }

    async remove(id: number) {
        const order = await this.findOne(id);
        return this.orderRepository.remove(order);
    }
}
