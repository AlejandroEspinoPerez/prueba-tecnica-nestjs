import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Client } from '../client/client.entity';
import { Restaurant } from '../restaurant/restaurant.entity';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @ManyToOne(() => Client, (client) => client.orders)
    client: Client;

    @ManyToOne(() => Restaurant, (restaurant) => restaurant.orders)
    restaurant: Restaurant;
}
