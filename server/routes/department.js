import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js'; // Make sure the path is correct
import { addDepartment ,getDepartments,getDepartment,updateDepartment,deleteDepartment} from '../controllers/departmentController.js';

const router = express.Router();

//call the api department and return the data from serverside 
router.get('/', authMiddleware, getDepartments);


// Apply authMiddleware to verify user, then call addDepartment controller function
router.post('/add', authMiddleware, addDepartment);
router.get('/:id', authMiddleware, getDepartment);
router.put('/:id', authMiddleware, updateDepartment);
router.delete('/:id', authMiddleware, deleteDepartment);


export default router; // departmentRouter
