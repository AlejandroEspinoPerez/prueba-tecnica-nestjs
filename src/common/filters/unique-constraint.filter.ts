// src/common/filters/unique-constraint.filter.ts

import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    ConflictException,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class UniqueConstraintFilter implements ExceptionFilter {
    catch(exception: QueryFailedError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        // Verifica si el error es de clave única duplicada
        if ((exception as any).code === '23505') {
            response.status(409).json({
                statusCode: 409,
                message: 'Ya existe un cliente con el mismo email. Por favor, usa uno diferente.',
            });
        } else {
            // Si es otro error de base de datos, devuélvelo sin modificaciones
            response.status(500).json({
                statusCode: 500,
                message: 'Error interno en el servidor',
            });
        }
    }
}
