import express from "express";
import dotenv from "dotenv";
import faqRoutes from "./src/routes/faqRoutes.js";
import connectDB from "./src/config/db.js";
import redisClient from "./src/config/redis.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use("/api/faqs", faqRoutes);

const PORT = process.env.PORT || 5000;

// Connect DB and Redis before starting server
const startServer = async () => {
  try {
    await connectDB();
    await redisClient.connect();
    console.log("Connected to Database and Redis");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();
