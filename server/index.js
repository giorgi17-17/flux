import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { getAllExercises } from "./src/controllers/exerciseController.js";

const app = express();
const port = 5000;

dotenv.config();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());  // <- notice the parentheses

const mongoUrl = `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_USER_PASSWORD}@cluster0.blqpftv.mongodb.net/Flux?retryWrites=true&w=majority`;

// Routes
app.get("/", (req, res) => {
  console.log("Root endpoint hit");
  res.status(200).send("Root");
});

app.get('/test', (req, res) => {
  console.log('Test endpoint hit');
  res.status(200).send('Test');
});

app.get('/api/exercises', getAllExercises);

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
