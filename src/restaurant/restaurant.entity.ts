// src/restaurant/restaurant.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from '../order/order.entity';
import { Client } from 'src/client/client.entity';

@Entity()
export class Restaurant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    capacity: number;

    @OneToMany(() => Order, (order) => order.restaurant)
    orders: Order[];

    @OneToMany(() => Client, (client) => client) // Placeholder for client association
    clients: Client[];
}
