import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantModule } from './restaurant/restaurant.module';
import { OrderModule } from './order/order.module';
import { ClientModule } from './client/client.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'prueba_tecnica',
    autoLoadEntities: true,
    synchronize: true,
    }),
    RestaurantModule,
    OrderModule,
    ClientModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
