import { v2 as cloudinary } from 'cloudinary'

const connectCloudinary = async () => {
    try {
        // Check if all required environment variables are present
        if (!process.env.CLOUDINARY_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_SECRET_KEY) {
            console.error('❌ Cloudinary configuration missing! Please set the following environment variables:');
            console.error('   CLOUDINARY_NAME=your_cloudinary_cloud_name');
            console.error('   CLOUDINARY_API_KEY=your_cloudinary_api_key');
            console.error('   CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key');
            console.error('');
            console.error('📝 Create a .env file in the backend directory with these variables.');
            console.error('🔗 Get your credentials from: https://cloudinary.com/console');
            return false;
        }

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_SECRET_KEY
        });

        console.log('✅ Cloudinary configured successfully');
        return true;
    } catch (error) {
        console.error('❌ Error configuring Cloudinary:', error.message);
        return false;
    }
}

export default connectCloudinary