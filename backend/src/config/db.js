import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        console.log("mongo url", process.env.MONGO_URL); 
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connected: ${mongoose.connection.host}`);
    } catch (error) {
        console.log("Error connecting to database", error.message);
        process.exit(1);
    }
}