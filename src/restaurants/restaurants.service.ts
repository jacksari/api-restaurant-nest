import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import APIFeatures from 'src/utils/apiFeatures.utils';
import UploadCloudinary from 'src/utils/uploadCloudinary';
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
        const restaurants = await this.restaurantModel.find({...key})
                                                    .limit(limit)
                                                    .skip(limit * ( page - 1))
                                                    .populate('user', 'email name');
        return restaurants;
    }

    async create(restaurant: Restaurant, user: User): Promise<Restaurant> {
        const location = await APIFeatures.getRestaurantLocation(restaurant.address);
        const data = Object.assign(restaurant, { user: user._id, location });    
        
        return await this.restaurantModel.create(data);
    }

    async findById(id: string): Promise<Restaurant> {
        const resp = await this.restaurantModel.findById(id).populate('user', 'email name');
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

    async uploadImages(id, files) {
        const images = [];
        for (const file of files) {
            const url = await UploadCloudinary.uploadImage(file);  
            images.push(url);
        }
        const restaurant = await this.restaurantModel.findByIdAndUpdate(id, {
            images: images as Object[]
        }, {
            new: true,
            runValidators: true
        })

        return restaurant;
    }
}
