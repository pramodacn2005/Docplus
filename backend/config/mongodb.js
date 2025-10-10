import mongoose from "mongoose";


const connectDB = async () => {

    mongoose.connection.on('connected', () => console.log("Database Connected"))

    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
    await mongoose.connect(mongoUri, {
        dbName: 'docplus_app'
    })

}

export default connectDB