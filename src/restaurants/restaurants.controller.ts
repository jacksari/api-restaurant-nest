import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { RestaurantsService } from './restaurants.service';
import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Restaurant } from './schemas/restaurant.schema';
import { isValidObjectId } from 'mongoose';

@Controller('restaurants')
export class RestaurantsController {
    constructor(
        private restaurantService: RestaurantsService
    ){}

    @Get()
    async getAllRestaurants(
        @Query() query
    ): Promise<Restaurant[]> {
        const search = query.search ? query.search : '';
        const page = query.page ? query.page : 1;
        const limit = query.limit ? query.limit : 2;
        
        return this.restaurantService.findAll(search, page, limit);
    }

    @Get(':id')
    async getRestaurant(
        @Param('id') 
        id: string
    ): Promise<Restaurant> {
        const isValidId = isValidObjectId(id);
        if(!isValidId){
            throw new BadRequestException('El id no es válido')
        }
        
        const resp = await this.restaurantService.findById(id);
        
        return resp;
    }

    @Post()
    async createRestaurant(
        @Body()
        restaurant: CreateRestaurantDto
    ): Promise<Restaurant> {
        return  this.restaurantService.create(restaurant);
    }

    @Put(':id')
    async updateRestaurant(
        @Param('id') id: string,
        @Body() restaurant: UpdateRestaurantDto
    ): Promise<Restaurant> {
        await this.restaurantService.findById(id);
        
        return this.restaurantService.updateById(id, restaurant);
    }

    @Delete(':id')
    async deleteRestaurant(
        @Param('id') id: string
    ): Promise<String> {
        await this.restaurantService.findById(id);

        await this.restaurantService.deleteById(id);
        return 'Restaurante eliminado'
    }
}

