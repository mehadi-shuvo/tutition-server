// cloudinaryConfig.ts
const cloudinary  = require("cloudinary").v2;
import config from '../config';


  cloudinary.config({
    cloud_name: config.image_cloud_name,
    api_key: config.image_cloud_key,
    api_secret: config.image_cloud_secret,
  });

