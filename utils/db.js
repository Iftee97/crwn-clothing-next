// import mongoose from 'mongoose'

// export async function connectToDb() {
//   try {
//     await mongoose.connect(process.env.MONGO_URI)
//     console.log('MongoDB Connected')
//   } catch (error) {
//     console.error(`Error: ${error.message}`)
//     process.exit(1)
//   }
// }

import mongoose from "mongoose";

export async function connectToDb(retries = 5, delay = 2000) {
  if (mongoose.connection.readyState === 1) {
    // console.log("Already connected to MongoDB");
    return;
  }

  const connectWithRetry = async (attempts) => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB Connected");
    } catch (error) {
      if (attempts <= 0) {
        console.error(`Could not connect to MongoDB: ${error.message}`);
        process.exit(1);
      } else {
        console.warn(`Retrying connection in ${delay / 1000} seconds...`);
        setTimeout(() => connectWithRetry(attempts - 1), delay);
      }
    }
  };

  connectWithRetry(retries);

  mongoose.connection.on("connected", () =>
    console.log("MongoDB connected successfully")
  );
  mongoose.connection.on("error", (err) =>
    console.error(`MongoDB connection error: ${err.message}`)
  );
  mongoose.connection.on("disconnected", () =>
    console.warn("MongoDB connection disconnected")
  );
}
