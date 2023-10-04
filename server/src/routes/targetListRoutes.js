import express from "express";
import { getAllTargetList } from "../controllers/targetListController.js";

const router = express.Router();

router.get("/", getAllTargetList);

export default router;
