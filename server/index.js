import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { getAllExercises } from "./src/controllers/exerciseController.js";
import {
  // createUser,
  getAllUsers,
  getUserById,
  registerOrUpdate,
} from "./src/controllers/usersController.js";
const app = express();
const port = 5000;

dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

const mongoUrl = `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_USER_PASSWORD}@cluster0.blqpftv.mongodb.net/Flux?retryWrites=true&w=majority`;

// Routes
app.get("/", (req, res) => {
  console.log("Root endpoint hit");
  res.status(200).send("Root");
});

app.use("/api/exercises", getAllExercises);
app.use("/api/users", getAllUsers);
// app.use("/api/addUsers", createUser);
app.use("/api/registerOrUpdate", registerOrUpdate);

app.get("/api/users/:id", getUserById);

// MongoDB connection
mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected successfully to MongoDB");
  })
  .catch((err) => {
    console.error("An error occurred while connecting to MongoDB:", err);
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
