import { Controller, Get, Post, Body, Param, Delete, Put, InternalServerErrorException } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Post()
    @ApiOperation({ summary: 'Crear una nueva orden', description: 'Crea una nueva orden asociando un cliente y un restaurante.' })
    @ApiBody({ type: CreateOrderDto, description: 'Datos de la orden a crear' })
    @ApiResponse({ status: 201, description: 'Orden creada correctamente.' })
    @ApiResponse({ status: 400, description: 'El cliente debe ser mayor de edad o la capacidad máxima del restaurante fue alcanzada.' })
    @ApiResponse({ status: 404, description: 'Cliente o restaurante no encontrado.' })
    @ApiResponse({ status: 500, description: 'Error en el servidor al crear la orden.' })
    async create(@Body() orderData: CreateOrderDto) {
        return await this.orderService.create(orderData);
    }

    @Get()
    @ApiOperation({ summary: 'Listar todas las órdenes', description: 'Obtiene una lista completa de todas las órdenes, incluyendo los detalles del cliente y restaurante.' })
    @ApiResponse({ status: 200, description: 'Lista de órdenes obtenida correctamente.' })
    async findAll() {
        return this.orderService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener una orden por ID', description: 'Devuelve los detalles de una orden específica dado su ID.' })
    @ApiParam({ name: 'id', type: Number, description: 'Identificador único de la orden' })
    @ApiResponse({ status: 200, description: 'Orden encontrada.' })
    @ApiResponse({ status: 404, description: 'Orden no encontrada.' })
    async findOne(@Param('id') id: number) {
        return this.orderService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar una orden', description: 'Modifica una orden específica usando su ID.' })
    @ApiParam({ name: 'id', type: Number, description: 'Identificador único de la orden a actualizar' })
    @ApiBody({ type: CreateOrderDto, description: 'Datos actualizados de la orden' })
    @ApiResponse({ status: 200, description: 'Orden actualizada correctamente.' })
    @ApiResponse({ status: 400, description: 'Datos inválidos para la actualización.' })
    @ApiResponse({ status: 404, description: 'Orden no encontrada.' })
    async update(@Param('id') id: number, @Body() orderData: CreateOrderDto) {
        return this.orderService.update(id, orderData);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar una orden', description: 'Elimina una orden específica usando su ID.' })
    @ApiParam({ name: 'id', type: Number, description: 'Identificador único de la orden a eliminar' })
    @ApiResponse({ status: 200, description: 'Orden eliminada correctamente.' })
    @ApiResponse({ status: 404, description: 'Orden no encontrada.' })
    async remove(@Param('id') id: number) {
        return this.orderService.remove(id);
    }
}
