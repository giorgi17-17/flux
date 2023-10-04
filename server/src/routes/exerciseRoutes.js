import express from 'express';
import { addExercise, getAllExercises } from '../controllers/exerciseController.js';

const router = express.Router();

// Route to add a new exercise
router.post('/add', addExercise);

// Route to get all exercises
router.get('/', getAllExercises);

export default router;
