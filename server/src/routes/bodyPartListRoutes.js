import express from 'express';
import { addBodyPartList, getAllBodyPartLists } from '../controllers/bodyPartListController.js';

const router = express.Router();

// Route to add a new body part list
router.post('/add', addBodyPartList);

// Route to get all body part lists
router.get('/', getAllBodyPartLists);

export default router;
