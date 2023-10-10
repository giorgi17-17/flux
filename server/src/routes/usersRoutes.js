import express from "express";
import { createUser, getAllUsers, registerOrUpdate } from "../controllers/usersController.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.post("/", registerOrUpdate);


export default router;
