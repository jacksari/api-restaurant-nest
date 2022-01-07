import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Restaurant } from './schemas/restaurant.schema';

@Injectable()
export class RestaurantsService {
    constructor(
        @InjectModel(Restaurant.name)
        private restaurantModel: Model<Restaurant>
    ){}

    async findAll(search: string, page: number, limit: number): Promise<Restaurant[]> {
        const key = {
            name: {
                $regex: search,
                $options: 'i'
            }
        }
        const restaurants = await this.restaurantModel.find({...key}).limit(limit).skip(limit * ( page - 1));
        return restaurants;
    }

    async create(restaurant: Restaurant): Promise<Restaurant> {
        return await this.restaurantModel.create(restaurant);
    }

    async findById(id: string): Promise<Restaurant> {
        const resp = await this.restaurantModel.findById(id);
        if(!resp){
            throw new NotFoundException('No existe el restaurante');
        }
        return resp;
    }

    async updateById(id: string, restaurant: Restaurant): Promise<Restaurant> {
        return await this.restaurantModel.findByIdAndUpdate(id, restaurant,{new: true, runValidators: true});
    }

    async deleteById(id: string): Promise<Restaurant> {
        return await this.restaurantModel.findByIdAndDelete(id);
    }
}
