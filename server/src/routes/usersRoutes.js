import express from "express";
import { createUser, getAllUsers, registerOrUpdate } from "../controllers/usersController.js";

const router = express.Router();

router.get("/", getAllUsers);


export default router;
