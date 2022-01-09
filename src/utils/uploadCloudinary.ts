import { deleteFile } from "./deleteFile";

var cloudinary = require('cloudinary');

export default class UploadCloudinary {
    static async uploadImage(file){
        cloudinary.config({ 
            cloud_name: 'mikunaalli', 
            api_key: '929543332587535', 
            api_secret: '76X0R6EAfQXnJg-FsE0-vCznr5o',
            secure: true,
        });
        
        try {
            const uploadResponse = await cloudinary.uploader.upload(file.path, { upload_preset: 'restaurant' });
            //console.log(uploadResponse);
            await deleteFile(file.path);
            return uploadResponse.url;
        } catch(err){
            console.log('ERROR',err);
        }

    }
}