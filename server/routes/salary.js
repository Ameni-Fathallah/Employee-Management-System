import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js'; // Make sure the path is correct
import { addSalary ,getSalary} from '../controllers/salaryController.js';

const router = express.Router();

router.post('/add', authMiddleware, addSalary);
router.get('/:id', authMiddleware, getSalary);

export default router; // departmentRouter

