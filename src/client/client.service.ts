// src/client/client.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(Client) private clientRepository: Repository<Client>,
    ) { }

    async create(clientData: Partial<Client>) {
        if (clientData.age < 18) {
            throw new BadRequestException('El cliente debe ser mayor de edad.');
        }
        return this.clientRepository.save(clientData);
    }

    async findAll() {
        return this.clientRepository.find();
    }

    async findOne(id: number) {
        return this.clientRepository.findOneBy({ id });
    }

    async update(id: number, updateData: Partial<Client>) {
        await this.clientRepository.update(id, updateData);
        return this.findOne(id);
    }

    async remove(id: number) {
        return this.clientRepository.delete(id);
    }
}
