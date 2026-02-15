import {v2 as cloudinary} from 'cloudinary';
import {config} from "dotenv";

config()

cloudinary.config(
    {
        api_key:process.env.CLOUDINARY_API,
        api_secret:process.env.CLOUDINARY_SECRET,
        cloud_name:process.env.CLOUDINARY_NAME
    }
);
export default cloudinary