import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from './restaurant.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('restaurants')
@Controller('restaurants')
export class RestaurantController {
    constructor(private readonly restaurantService: RestaurantService) { }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo restaurante', description: 'Crea un nuevo restaurante con los datos proporcionados.' })
    @ApiBody({ type: Restaurant, description: 'Información del restaurante a crear' })
    @ApiResponse({ status: 201, description: 'Restaurante creado exitosamente.', type: Restaurant })
    @ApiResponse({ status: 400, description: 'Datos de entrada inválidos.' })
    @ApiResponse({ status: 500, description: 'Error interno al crear el restaurante.' })
    create(@Body() restaurantData: Partial<Restaurant>) {
        return this.restaurantService.create(restaurantData);
    }

    @Get()
    @ApiOperation({ summary: 'Listar todos los restaurantes', description: 'Obtiene una lista de todos los restaurantes registrados.' })
    @ApiResponse({ status: 200, description: 'Lista de restaurantes obtenida exitosamente.', type: [Restaurant] })
    async findAll() {
        return this.restaurantService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un restaurante por ID', description: 'Obtiene los detalles de un restaurante específico usando su ID.' })
    @ApiParam({ name: 'id', type: Number, description: 'Identificador único del restaurante' })
    @ApiResponse({ status: 200, description: 'Restaurante encontrado exitosamente.', type: Restaurant })
    @ApiResponse({ status: 404, description: 'Restaurante no encontrado.' })
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.restaurantService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar un restaurante', description: 'Actualiza los datos de un restaurante específico usando su ID.' })
    @ApiParam({ name: 'id', type: Number, description: 'Identificador único del restaurante' })
    @ApiBody({ type: Restaurant, description: 'Datos actualizados del restaurante' })
    @ApiResponse({ status: 200, description: 'Restaurante actualizado exitosamente.', type: Restaurant })
    @ApiResponse({ status: 400, description: 'Datos de entrada inválidos para la actualización.' })
    @ApiResponse({ status: 404, description: 'Restaurante no encontrado.' })
    async update(@Param('id', ParseIntPipe) id: number, @Body() restaurantData: Partial<Restaurant>) {
        return this.restaurantService.update(id, restaurantData);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un restaurante', description: 'Elimina un restaurante específico usando su ID.' })
    @ApiParam({ name: 'id', type: Number, description: 'Identificador único del restaurante a eliminar' })
    @ApiResponse({ status: 200, description: 'Restaurante eliminado exitosamente.' })
    @ApiResponse({ status: 404, description: 'Restaurante no encontrado.' })
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.restaurantService.remove(id);
    }
}
