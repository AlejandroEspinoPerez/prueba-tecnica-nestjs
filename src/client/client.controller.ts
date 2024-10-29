// src/client/client.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from './client.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('clients')
@Controller('clients')
export class ClientController {
    constructor(private readonly clientService: ClientService) { }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo cliente', description: 'Crea un cliente con los datos proporcionados.' })
    @ApiBody({ type: Client, description: 'Información del cliente a crear' })
    @ApiResponse({ status: 201, description: 'Cliente creado exitosamente.', type: Client })
    @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
    @ApiResponse({ status: 500, description: 'Error interno al crear el cliente.' })
    async create(@Body() clientData: Partial<Client>) {
        return this.clientService.create(clientData);
    }

    @Get()
    @ApiOperation({ summary: 'Listar todos los clientes', description: 'Obtiene una lista de todos los clientes registrados.' })
    @ApiResponse({ status: 200, description: 'Lista de clientes obtenida exitosamente.', type: [Client] })
    async findAll() {
        return this.clientService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un cliente por ID', description: 'Obtiene los detalles de un cliente específico usando su ID.' })
    @ApiParam({ name: 'id', type: Number, description: 'Identificador único del cliente' })
    @ApiResponse({ status: 200, description: 'Cliente encontrado exitosamente.', type: Client })
    @ApiResponse({ status: 404, description: 'Cliente no encontrado.' })
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.clientService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar un cliente', description: 'Actualiza los datos de un cliente específico usando su ID.' })
    @ApiParam({ name: 'id', type: Number, description: 'Identificador único del cliente' })
    @ApiBody({ type: Client, description: 'Datos actualizados del cliente' })
    @ApiResponse({ status: 200, description: 'Cliente actualizado exitosamente.', type: Client })
    @ApiResponse({ status: 400, description: 'Datos de entrada inválidos para la actualización.' })
    @ApiResponse({ status: 404, description: 'Cliente no encontrado.' })
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateData: Partial<Client>) {
        return this.clientService.update(id, updateData);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un cliente', description: 'Elimina un cliente específico usando su ID.' })
    @ApiParam({ name: 'id', type: Number, description: 'Identificador único del cliente a eliminar' })
    @ApiResponse({ status: 200, description: 'Cliente eliminado exitosamente.' })
    @ApiResponse({ status: 404, description: 'Cliente no encontrado.' })
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.clientService.remove(id);
    }
}
