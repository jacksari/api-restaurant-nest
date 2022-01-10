import { JwtService } from "@nestjs/jwt";
import { Location } from "src/restaurants/schemas/restaurant.schema";

const nodeGeocoder = require('node-geocoder');

export default class APIFeatures {
    static async getRestaurantLocation( address ) {

        try {
            const options = {
                provider: process.env.GEOCODER_PROVIDER,
                apiKey: process.env.GEOCODER_KEY, // for Mapquest, OpenCage, Google Premier
                formatter: null, // 'gpx', 'string', ...
                httpAdapter: 'https',
            };
            const geocoder = nodeGeocoder(options);

            const loc = await geocoder.geocode(address);
            
            const location: Location = {
                type: 'Point',
                coordinates: [ loc[0].latitude, loc[0].longitude ],
                formattedAddress: loc[0].formattedAddress,
                city: loc[0].city,
                state: loc[0].stateCode,
                zipcode: loc[0].zipcode,
                country: loc[0].countryCode,
                countryCode: loc[0].countryCode,
                streetNumber: loc[0].streetNumber,
                streetName: loc[0].streetName
            }
            return location;

        } catch (e) {
            console.log(e);
        }
    }

    static async assignJwtToken(
        userId: string,
        jwtService: JwtService
    ): Promise<string> {
        const token = await jwtService.sign({
            id: userId
        });
        return token;
    }
}