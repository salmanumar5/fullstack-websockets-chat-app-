const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connection Successful: ${con.connection.host}`);
        
    } catch (error) {
        console.log("MongoDB connection Failed", error);
        process.exit(1);
        
    }
}

module.exports = connectDB;