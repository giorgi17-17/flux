import express from "express";
import { createUser, getAllUsers } from "../controllers/usersController.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);

export default router;
