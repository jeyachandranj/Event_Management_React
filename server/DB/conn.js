const mongoose = require("mongoose");

// Set the DATABASE environment variable directly
process.env.DATABASE = "mongodb+srv://jeyachandranj:jj.jeyan@cluster0.pe8ib.mongodb.net/event-management";

// Retrieve the value of the DATABASE environment variable
const DB = process.env.DATABASE;

mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    await mongoose.connect(DB, {
      //useNewUrlParser: true,
      //useUnifiedTopology: true,
      // usefindOneAndUpdate: false, // Use findOneAndUpdate() instead
      // useCreateIndex: true // Use createIndex() instead
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
