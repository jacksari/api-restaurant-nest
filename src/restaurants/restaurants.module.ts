import { AuthModule } from './../auth/auth.module';
import { RestaurantSchema } from './schemas/restaurant.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';

@Module({
    imports: [
        AuthModule,
        MongooseModule.forFeature([
            {
                name: 'Restaurant', schema: RestaurantSchema
            }
        ])
    ],
  controllers: [RestaurantsController],
  providers: [RestaurantsService]
})
export class RestaurantsModule {}
